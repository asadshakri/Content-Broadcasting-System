const Content = require("../models/content");
const Slot = require("../models/slot");
const Schedule = require("../models/schedule");
const s3 = require("../utils/s3");
require("dotenv").config();
const sequelize = require("../utils/db-connection");

const uploadContentService = async (body, file, userId) => {
  if (!file) {
    throw new Error("File is required");
  }

  if (!body.subject || !body.title) {
    throw new Error("Subject and title are required");
  }

  const key = `content/${Date.now()}-${file.originalname}`;

  const upload = await s3
    .upload({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    })
    .promise();

  const contentDetails = await content.create({
    title: body.title,
    description: body.description,
    subject: body.subject,
    file_path: upload.Location,
    file_type: file.mimetype,
    file_size: file.size,
    uploaded_by: userId,
    start_time: new Date(body.start_time),
    end_time: new Date(body.end_time),
  });

  return contentDetails;
};

const getMyContents = async (userId) => {
  return await Content.findAll({
    where: {
      uploaded_by: userId,
    },
  });
};

const getApprovedContents = async (userId) => {
  return await Content.findAll({
    where: {
      uploaded_by: userId,
      status: "approved",
    },
  });
};

const scheduleContentService = async (contentId, userId, duration) => {
  const t = await sequelize.transaction();

  try {
    const appContent = await Content.findOne({
      where: {
        id: contentId,
        uploaded_by: userId,
        status: "approved",
      },
      transaction: t,
    });

    if (!appContent) {
      throw new Error("Approved content not found");
    }

    const [slot] = await Slot.findOrCreate({
      where: {
        subject: appContent.subject,
      },
      transaction: t,
    });

    const existing = await Schedule.findOne({
      where: {
        content_id: appContent.id,
      },
      transaction: t,
    });

    if (existing) {
      throw new Error("Content already scheduled");
    }

    const max = await Schedule.max("rotation_order", {
      where: {
        slot_id: slot.id,
      },
      transaction: t,
    });

    const row = await Schedule.create(
      {
        content_id: appContent.id,
        slot_id: slot.id,
        rotation_order: (max || 0) + 1,
        duration_minutes: duration || 5,
      },
      {
        transaction: t,
      }
    );

    await t.commit();

    return row;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

module.exports = {
  uploadContentService,
  getMyContents,
  getApprovedContents,
  scheduleContentService,
};
