const contentService = require("../services/contentService");

const uploadContent = async (req, res) => {
  try {
    const data = await contentService.uploadContentService(
      req.body,
      req.file,
      req.user.id
    );

    res.status(201).json({
      message: "Content uploaded successfully",
      contentDetails: data,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const myContents = async (req, res) => {
  try {
    const data = await contentService.getMyContents(req.user.id);

    res.status(200).json({
      contents: data,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const approvedContent = async (req, res) => {
  try {
    const data = await contentService.getApprovedContents(req.user.id);

    res.status(200).json({
      contents: data,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const scheduleContent = async (req, res) => {
  try {
    const data = await contentService.scheduleContentService(
      req.params.id,
      req.user.id,
      req.body.duration
    );

    res.status(200).json({
      message: "Content scheduled successfully",
      scheduleDetails: data,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = {
  uploadContent,
  myContents,
  approvedContent,
  scheduleContent,
};
