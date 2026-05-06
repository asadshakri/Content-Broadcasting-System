# Content Broadcasting System

A backend system for modern educational institutes where teachers upload study content (like algebra notes, science notes), principals approve/reject it, and students access approved rotating live content through public APIs. This application is deployed on AWS EC2.

---

## Demo 
```
https://drive.google.com/file/d/184k6kfnX0tNXoFOPbl8vz5UG2lbtAeiN/view?usp=sharing
```

## Postman Link
```
https://documenter.getpostman.com/view/47935927/2sBXqJJKwu
```

## Tech Stack

### Backend  
- Node.js  
- Express.js

### Database  
- MySQL (AWS RDS)

### ORM  
- Sequelize

### Authentication  
- JWT (JSON Web Token)  
- bcrypt

### File Upload  
- Multer

### Cloud Storage  
- AWS S3

### Security  
- CORS  
- Express Rate Limit

# Installation Setup

### Clone Project
```bash
  git clone https://github.com/asadshakri/Content-Broadcasting-System.git
  cd content-broadcasting-system
 ```

### Install Dependencies 
```bash
  npm install  
```
    
### Environment Variable
```bash
  PORT  
    
  RDS_ENDPOINT  
  DB_USER  
  DB_PASSWORD  
  DB_NAME  
  DB_DIALECT  
  TOKEN= JWT secret  
    
  AWS_ACCESS_KEY  
  AWS_SECRET_KEY  
  AWS_REGION  
  AWS_BUCKET_NAME  
```
    
### Run Server 
```bash 
  node app.js
```

## API ENDPOINTS

### AUTH APIs

1. Register User ->  POST /user/register

Body: 

```json   
{  
  "name":"teacherOne",  
  "email": "teacher1@gmail.com",  
  "password": "teacherOne123",  
  "role": "teacher"  
}
```

2. Login User ->   POST /user/login

Body: 
```json  
{  
  "email": "teacher1@gmail.com",  
  "password": "teacherOne123"  
}
```

Response:
```json  
{  
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc3NzMxMzc5MCwiZXhwIjoxNzc3MzMxNzkwfQ.K1aXRyXw3BD0EsoVTb71Fw2Jxtcv7bbk7PVNWMNOrds",  
    "message": "Login successful"  
}
```

Token expires in 5 hours

### TEACHER APIs

Authorization Required:

Authorization: Bearer TOKEN

1. Upload Content ->   POST /content/upload

Body:  
![formdata](formdata.PNG)

Response  
```json
{  
    "message": "Content uploaded successfully",  
    "contentDetails": {  
        "status": "pending",  
        "id": 1,  
        "title": "alzebra",  
        "description": "problem on alzebra",  
        "subject": "Maths",  
        "file_path": "https://contentbroadcast.s3.ap-south-1.amazonaws.com/content/1777314612406-ci.PNG",  
        "file_type": "image/png",  
        "file_size": 14172,  
        "uploaded_by": 2,  
        "start_time": "2026-04-27T09:00:00.000Z",  
        "end_time": "2026-04-30T18:00:00.000Z",  
        "updatedAt": "2026-04-27T18:30:12.515Z",  
        "createdAt": "2026-04-27T18:30:12.515Z"  
    }  
}
```

2. View My Content ->  GET /content/my-contents

Response  

```json
{  
    "contents": [  
        {  
            "id": 1,  
            "title": "alzebra",  
            "description": "problem on alzebra",  
            "subject": "Maths",  
            "file_path": "https://contentbroadcast.s3.ap-south-1.amazonaws.com/content/1777314612406-ci.PNG",  
            "file_type": "image/png",  
            "file_size": 14172,  
            "status": "pending",  
            "rejection_reason": null,  
            "approved_at": null,  
            "start_time": "2026-04-27T09:00:00.000Z",  
            "end_time": "2026-04-30T18:00:00.000Z",  
            "createdAt": "2026-04-27T18:30:12.000Z",  
            "updatedAt": "2026-04-27T18:30:12.000Z",  
            "uploaded_by": 2,  
            "approved_by": null  
        },  
        {  
            "id": 2,  
            "title": "compute",  
            "description": "problem on yaml",  
            "subject": "Maths",  
            "file_path": "https://contentbroadcast.s3.ap-south-1.amazonaws.com/content/1777315183442-yaml.PNG",  
            "file_type": "image/png",  
            "file_size": 42921,  
            "status": "pending",  
            "rejection_reason": null,  
            "approved_at": null,  
            "start_time": "2026-04-27T09:00:00.000Z",  
            "end_time": "2026-04-30T18:00:00.000Z",  
            "createdAt": "2026-04-27T18:39:43.000Z",  
            "updatedAt": "2026-04-27T18:39:43.000Z",  
            "uploaded_by": 2,  
            "approved_by": null  
        }  
    ]  
}
```

3. View Approved Content ->  GET /content/approved-contents

Response: 
```json
{  
    "contents": [  
        {  
            "id": 2,  
            "title": "compute",  
            "description": "problem on yaml",  
            "subject": "Maths",  
            "file_path": "https://contentbroadcast.s3.ap-south-1.amazonaws.com/content/1777315183442-yaml.PNG",  
            "file_type": "image/png",  
            "file_size": 42921,  
            "status": "approved",  
            "rejection_reason": null,  
            "approved_at": "2026-04-27T19:08:39.000Z",  
            "start_time": "2026-04-27T09:00:00.000Z",  
            "end_time": "2026-04-30T18:00:00.000Z",  
            "createdAt": "2026-04-27T18:39:43.000Z",  
            "updatedAt": "2026-04-27T19:08:39.000Z",  
            "uploaded_by": 2,  
            "approved_by": 1  
        }  
    ]  
}
```

4. Schedule Approved Content ->  POST /content/schedule-content/:id

Body: 
```json
{  
    "duration": 1  
}
```

Response:
```json 
{  
    "message": "Content scheduled successfully",  
    "scheduleDetails": {  
        "id": 1,  
        "content_id": 2,  
        "slot_id": 1,  
        "rotation_order": 1,  
        "duration_minutes": 1,  
        "updatedAt": "2026-04-27T19:14:06.826Z",  
        "createdAt": "2026-04-27T19:14:06.826Z"  
    }  
}
```

### Principal APIs

Authorization Required:

Authorization: Bearer TOKEN

1. View All Content ->  GET /principal/uploaded-contents

Response:
```json
[  
    {  
        "id": 1,  
        "title": "alzebra",  
        "description": "problem on alzebra",  
        "subject": "Maths",  
        "file_path": "https://contentbroadcast.s3.ap-south-1.amazonaws.com/content/1777314612406-ci.PNG",  
        "file_type": "image/png",  
        "file_size": 14172,  
        "status": "pending",  
        "rejection_reason": null,  
        "approved_at": null,  
        "start_time": "2026-04-27T09:00:00.000Z",  
        "end_time": "2026-04-30T18:00:00.000Z",  
        "createdAt": "2026-04-27T18:30:12.000Z",  
        "updatedAt": "2026-04-27T18:30:12.000Z",  
        "uploaded_by": 2,  
        "approved_by": null  
    },  
    {  
        "id": 2,  
        "title": "compute",  
        "description": "problem on yaml",  
        "subject": "Maths",  
        "file_path": "https://contentbroadcast.s3.ap-south-1.amazonaws.com/content/1777315183442-yaml.PNG",  
        "file_type": "image/png",  
        "file_size": 42921,  
        "status": "pending",  
        "rejection_reason": null,  
        "approved_at": null,  
        "start_time": "2026-04-27T09:00:00.000Z",  
        "end_time": "2026-04-30T18:00:00.000Z",  
        "createdAt": "2026-04-27T18:39:43.000Z",  
        "updatedAt": "2026-04-27T18:39:43.000Z",  
        "uploaded_by": 2,  
        "approved_by": null  
    }  
]
```

2. Reject Content ->  PATCH /principal/reject-content/:id

Body 
```json
{  
    "reason":"Other content is scheduled"  
}
```

Response
```json 
{  
    "message": "Content rejected successfully",  
    "contentRejected": [  
        1  
    ]  
}
```

3. View Pending Content -> GET /principal/pending-contents

Response 
```json 
[  
    {  
        "id": 2,  
        "title": "compute",  
        "description": "problem on yaml",  
        "subject": "Maths",  
        "file_path": "https://contentbroadcast.s3.ap-south-1.amazonaws.com/content/1777315183442-yaml.PNG",  
        "file_type": "image/png",  
        "file_size": 42921,  
        "status": "pending",  
        "rejection_reason": null,  
        "approved_at": null,  
        "start_time": "2026-04-27T09:00:00.000Z",  
        "end_time": "2026-04-30T18:00:00.000Z",  
        "createdAt": "2026-04-27T18:39:43.000Z",  
        "updatedAt": "2026-04-27T18:39:43.000Z",  
        "uploaded_by": 2,  
        "approved_by": null  
    }  
]
```

4. Approve Content ->  PATCH /principal/approve-content/:id

Body
```json 
{

}
```

Response
```json 
{  
    "message": "Content approved successfully",  
    "contentApproved": {  
        "id": 2,  
        "title": "compute",  
        "description": "problem on yaml",  
        "subject": "Maths",  
        "file_path": "https://contentbroadcast.s3.ap-south-1.amazonaws.com/content/1777315183442-yaml.PNG",  
        "file_type": "image/png",  
        "file_size": 42921,  
        "status": "approved",  
        "rejection_reason": null,  
        "approved_at": "2026-04-27T19:08:39.657Z",  
        "start_time": "2026-04-27T09:00:00.000Z",  
        "end_time": "2026-04-30T18:00:00.000Z",  
        "createdAt": "2026-04-27T18:39:43.000Z",  
        "updatedAt": "2026-04-27T19:08:39.658Z",  
        "uploaded_by": 2,  
        "approved_by": 1  
    }  
}
```

### PUBLIC APIs

No Authentication Required

GET /api/content/live/:teacherId?subject=Maths

Response  
```json
{  
    "message": "Live content found",  
    "response": {  
        "id": 3,  
        "title": "alzebra",  
        "description": "problems on alzebra",  
        "subject": "Maths",  
        "file_path": "https://contentbroadcast.s3.ap-south-1.amazonaws.com/content/1777317543016-ci.PNG",  
        "file_type": "image/png",  
        "file_size": 14172,  
        "status": "approved",  
        "rejection_reason": null,  
        "approved_at": "2026-04-27T19:26:20.000Z",  
        "start_time": "2026-04-27T09:00:00.000Z",  
        "end_time": "2026-04-30T18:00:00.000Z",  
        "createdAt": "2026-04-27T19:19:03.000Z",  
        "updatedAt": "2026-04-27T19:26:20.000Z",  
        "uploaded_by": 2,  
        "approved_by": 1  
    }  
}
```
After 1 mins Response changes->

```json
{  
    "message": "Live content found",  
    "response": {  
        "id": 2,  
        "title": "compute",  
        "description": "problem on yaml",  
        "subject": "Maths",  
        "file_path": "https://contentbroadcast.s3.ap-south-1.amazonaws.com/content/1777315183442-yaml.PNG",  
        "file_type": "image/png",  
        "file_size": 42921,  
        "status": "approved",  
        "rejection_reason": null,  
        "approved_at": "2026-04-27T19:08:39.000Z",  
        "start_time": "2026-04-27T09:00:00.000Z",  
        "end_time": "2026-04-30T18:00:00.000Z",  
        "createdAt": "2026-04-27T18:39:43.000Z",  
        "updatedAt": "2026-04-27T19:08:39.000Z",  
        "uploaded_by": 2,  
        "approved_by": 1  
    }  
}
```
