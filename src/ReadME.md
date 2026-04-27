\# Content Broadcasting System

A backend system for modern educational institutes where teachers upload study content (like algebra notes, science notes), principals approve/reject it, and students access approved rotating live content through public APIs. This application is deployed on AWS EC2.

\# Tech Stack

\#\# Backend  
\- Node.js  
\- Express.js

\#\# Database  
\- MySQL (AWS RDS)

\#\# ORM  
\- Sequelize

\#\# Authentication  
\- JWT (JSON Web Token)  
\- bcrypt

\#\# File Upload  
\- Multer

\#\# Cloud Storage  
\- AWS S3

\#\# Security  
\- CORS  
\- Express Rate Limit

\#Installation Setup

* Clone Project  
  git clone \<your-repo-url\>  
  cd content-broadcasting-system

* Install Dependencies  
  npm install  
    
* Environment Variable  
  PORT  
    
  RDS\_ENDPOINT  
  DB\_USER  
  DB\_PASSWORD  
  DB\_NAME  
  DB\_DIALECT  
  TOKEN= JWT secret  
    
  AWS\_ACCESS\_KEY  
  AWS\_SECRET\_KEY  
  AWS\_REGION  
  AWS\_BUCKET\_NAME  
    
* Run Server  
  node app.js

# \# API ENDPOINTS

AUTH APIs

1. Register User \-\>  POST /user/register

Body:  
   
{  
  "name":"teacherOne",  
  "email": "teacher1@gmail.com",  
  "password": "teacherOne123",  
  "role": "teacher"  
}

2. Login User \-\>   POST /user/login

Body:   
{  
  "email": "teacher1@gmail.com",  
  "password": "teacherOne123"  
}

Response:  
{  
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc3NzMxMzc5MCwiZXhwIjoxNzc3MzMxNzkwfQ.K1aXRyXw3BD0EsoVTb71Fw2Jxtcv7bbk7PVNWMNOrds",  
    "message": "Login successful"  
}

Token expires in 5 hours

TEACHER APIs

Authorization Required:

Authorization: Bearer TOKEN

1. Upload Content \-\>   POST /content/upload

Body:  
![][image1]

Response  
{  
    "message": "Content uploaded successfully",  
    "contentDetails": {  
        "status": "pending",  
        "id": 1,  
        "title": "alzebra",  
        "description": "problem on alzebra",  
        "subject": "Maths",  
        "file\_path": "https://contentbroadcast.s3.ap-south-1.amazonaws.com/content/1777314612406-ci.PNG",  
        "file\_type": "image/png",  
        "file\_size": 14172,  
        "uploaded\_by": 2,  
        "start\_time": "2026-04-27T09:00:00.000Z",  
        "end\_time": "2026-04-30T18:00:00.000Z",  
        "updatedAt": "2026-04-27T18:30:12.515Z",  
        "createdAt": "2026-04-27T18:30:12.515Z"  
    }  
}

2. View My Content \-\>  GET /content/my-contents

Response  
{  
    "contents": \[  
        {  
            "id": 1,  
            "title": "alzebra",  
            "description": "problem on alzebra",  
            "subject": "Maths",  
            "file\_path": "https://contentbroadcast.s3.ap-south-1.amazonaws.com/content/1777314612406-ci.PNG",  
            "file\_type": "image/png",  
            "file\_size": 14172,  
            "status": "pending",  
            "rejection\_reason": null,  
            "approved\_at": null,  
            "start\_time": "2026-04-27T09:00:00.000Z",  
            "end\_time": "2026-04-30T18:00:00.000Z",  
            "createdAt": "2026-04-27T18:30:12.000Z",  
            "updatedAt": "2026-04-27T18:30:12.000Z",  
            "uploaded\_by": 2,  
            "approved\_by": null  
        },  
        {  
            "id": 2,  
            "title": "compute",  
            "description": "problem on yaml",  
            "subject": "Maths",  
            "file\_path": "https://contentbroadcast.s3.ap-south-1.amazonaws.com/content/1777315183442-yaml.PNG",  
            "file\_type": "image/png",  
            "file\_size": 42921,  
            "status": "pending",  
            "rejection\_reason": null,  
            "approved\_at": null,  
            "start\_time": "2026-04-27T09:00:00.000Z",  
            "end\_time": "2026-04-30T18:00:00.000Z",  
            "createdAt": "2026-04-27T18:39:43.000Z",  
            "updatedAt": "2026-04-27T18:39:43.000Z",  
            "uploaded\_by": 2,  
            "approved\_by": null  
        }  
    \]  
}

3. View Approved Content \-\>  GET /content/approved-contents

Response:  
{  
    "contents": \[  
        {  
            "id": 2,  
            "title": "compute",  
            "description": "problem on yaml",  
            "subject": "Maths",  
            "file\_path": "https://contentbroadcast.s3.ap-south-1.amazonaws.com/content/1777315183442-yaml.PNG",  
            "file\_type": "image/png",  
            "file\_size": 42921,  
            "status": "approved",  
            "rejection\_reason": null,  
            "approved\_at": "2026-04-27T19:08:39.000Z",  
            "start\_time": "2026-04-27T09:00:00.000Z",  
            "end\_time": "2026-04-30T18:00:00.000Z",  
            "createdAt": "2026-04-27T18:39:43.000Z",  
            "updatedAt": "2026-04-27T19:08:39.000Z",  
            "uploaded\_by": 2,  
            "approved\_by": 1  
        }  
    \]  
}

4. Schedule Approved Content \-\>  POST /content/schedule-content/:id

Body:  
{  
    "duration": 1  
}

Response:  
{  
    "message": "Content scheduled successfully",  
    "scheduleDetails": {  
        "id": 1,  
        "content\_id": 2,  
        "slot\_id": 1,  
        "rotation\_order": 1,  
        "duration\_minutes": 1,  
        "updatedAt": "2026-04-27T19:14:06.826Z",  
        "createdAt": "2026-04-27T19:14:06.826Z"  
    }  
}

Principal APIs

Authorization Required:

Authorization: Bearer TOKEN

1. View All Content \-\>  GET /principal/uploaded-contents

Response:  
\[  
    {  
        "id": 1,  
        "title": "alzebra",  
        "description": "problem on alzebra",  
        "subject": "Maths",  
        "file\_path": "https://contentbroadcast.s3.ap-south-1.amazonaws.com/content/1777314612406-ci.PNG",  
        "file\_type": "image/png",  
        "file\_size": 14172,  
        "status": "pending",  
        "rejection\_reason": null,  
        "approved\_at": null,  
        "start\_time": "2026-04-27T09:00:00.000Z",  
        "end\_time": "2026-04-30T18:00:00.000Z",  
        "createdAt": "2026-04-27T18:30:12.000Z",  
        "updatedAt": "2026-04-27T18:30:12.000Z",  
        "uploaded\_by": 2,  
        "approved\_by": null  
    },  
    {  
        "id": 2,  
        "title": "compute",  
        "description": "problem on yaml",  
        "subject": "Maths",  
        "file\_path": "https://contentbroadcast.s3.ap-south-1.amazonaws.com/content/1777315183442-yaml.PNG",  
        "file\_type": "image/png",  
        "file\_size": 42921,  
        "status": "pending",  
        "rejection\_reason": null,  
        "approved\_at": null,  
        "start\_time": "2026-04-27T09:00:00.000Z",  
        "end\_time": "2026-04-30T18:00:00.000Z",  
        "createdAt": "2026-04-27T18:39:43.000Z",  
        "updatedAt": "2026-04-27T18:39:43.000Z",  
        "uploaded\_by": 2,  
        "approved\_by": null  
    }  
\]

2. Reject Content \-\>  PATCH /principal/reject-content/:id

Body  
{  
    "reason":"Other content is scheduled"  
}

Response  
{  
    "message": "Content rejected successfully",  
    "contentRejected": \[  
        1  
    \]  
}

3. View Pending Content \-\> GET /principal/pending-contents

Response  
\[  
    {  
        "id": 2,  
        "title": "compute",  
        "description": "problem on yaml",  
        "subject": "Maths",  
        "file\_path": "https://contentbroadcast.s3.ap-south-1.amazonaws.com/content/1777315183442-yaml.PNG",  
        "file\_type": "image/png",  
        "file\_size": 42921,  
        "status": "pending",  
        "rejection\_reason": null,  
        "approved\_at": null,  
        "start\_time": "2026-04-27T09:00:00.000Z",  
        "end\_time": "2026-04-30T18:00:00.000Z",  
        "createdAt": "2026-04-27T18:39:43.000Z",  
        "updatedAt": "2026-04-27T18:39:43.000Z",  
        "uploaded\_by": 2,  
        "approved\_by": null  
    }  
\]

4. Approve Content \-\>  PATCH /principal/approve-content/:id

Body  
{

}

Response  
{  
    "message": "Content approved successfully",  
    "contentApproved": {  
        "id": 2,  
        "title": "compute",  
        "description": "problem on yaml",  
        "subject": "Maths",  
        "file\_path": "https://contentbroadcast.s3.ap-south-1.amazonaws.com/content/1777315183442-yaml.PNG",  
        "file\_type": "image/png",  
        "file\_size": 42921,  
        "status": "approved",  
        "rejection\_reason": null,  
        "approved\_at": "2026-04-27T19:08:39.657Z",  
        "start\_time": "2026-04-27T09:00:00.000Z",  
        "end\_time": "2026-04-30T18:00:00.000Z",  
        "createdAt": "2026-04-27T18:39:43.000Z",  
        "updatedAt": "2026-04-27T19:08:39.658Z",  
        "uploaded\_by": 2,  
        "approved\_by": 1  
    }  
}

PUBLIC APIs

No Authentication Required

GET /api/content/live/:teacherId?subject=Maths

Response  
{  
    "message": "Live content found",  
    "response": {  
        "id": 3,  
        "title": "alzebra",  
        "description": "problems on alzebra",  
        "subject": "Maths",  
        "file\_path": "https://contentbroadcast.s3.ap-south-1.amazonaws.com/content/1777317543016-ci.PNG",  
        "file\_type": "image/png",  
        "file\_size": 14172,  
        "status": "approved",  
        "rejection\_reason": null,  
        "approved\_at": "2026-04-27T19:26:20.000Z",  
        "start\_time": "2026-04-27T09:00:00.000Z",  
        "end\_time": "2026-04-30T18:00:00.000Z",  
        "createdAt": "2026-04-27T19:19:03.000Z",  
        "updatedAt": "2026-04-27T19:26:20.000Z",  
        "uploaded\_by": 2,  
        "approved\_by": 1  
    }  
}

After 1 mins Response changes-\>

{  
    "message": "Live content found",  
    "response": {  
        "id": 2,  
        "title": "compute",  
        "description": "problem on yaml",  
        "subject": "Maths",  
        "file\_path": "https://contentbroadcast.s3.ap-south-1.amazonaws.com/content/1777315183442-yaml.PNG",  
        "file\_type": "image/png",  
        "file\_size": 42921,  
        "status": "approved",  
        "rejection\_reason": null,  
        "approved\_at": "2026-04-27T19:08:39.000Z",  
        "start\_time": "2026-04-27T09:00:00.000Z",  
        "end\_time": "2026-04-30T18:00:00.000Z",  
        "createdAt": "2026-04-27T18:39:43.000Z",  
        "updatedAt": "2026-04-27T19:08:39.000Z",  
        "uploaded\_by": 2,  
        "approved\_by": 1  
    }  
}

#  

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAf0AAAEECAYAAAAiUe1ZAABEj0lEQVR4Xu29/49b133n3X+gPzy/LPaHxYOd2lJlKbJTwavanoo7sSsldSaSHVm1ws2sRYdRZKvRbFSr86zlZzyIPZXrZVVYptROCAkqoWqWCjICH1d42KyydKEdAdGEQjqm8GQeqonKEaKGgA0THiR0FOCzn8/9xnsPz5B3yCHnDu9bxgsm7/ly7+fyvM/7nHMPOb81MDBAAADQbzzwwAO0adMm2rJlS98g8UhcaqwA+OW31AMAAAAA6E9g+gAAAEBIgOkDAAAAIQGmDwAAAIQEmD4AAAAQEmD6AAAAQEiA6QMAAAAhAaYPAAAAhIQG09+6dStt376dnnjiCRocHARdQu6v3Ge53+pnAAAAAHQDx/Q3bNhgmJBqTqD7yH2X+69+OAAAAMBq4pg+DH9tkfuvfjgAAADAamKYviwxqyYEeg+W+gEAAHQTw/Qxyw8GmO0DAADoJobpY9NeMJDPQf2AAAAAgNXCMH3VfMDaoX5AAAAAwGrRhunH6ET6Pfr+d/+SYg1poFPUDwgAAABYLVZs+t/5p0+JPv2Qfv7P79O7mvSe8Pc/I/rkR83P/1/epe/lztMJ9XjAUT8gAAAAYLVYoelP0PUP2W8L72rS/PPc12L0nP3++SN05GuNeZrix/RP/Yg+oZ/Re+rxgKN+QAAAAMBqsQLTf5d+9AnV/xmm+xy9+79+Tp/+xjr2y5/T9dPPGfnfu8NZFn9GUsQYJBgm/CH97J8/NfN+/CN67x+5rFX0wxvv1gcCDbxC79nluJYPij93TP+Vv/uAPpTzf8rpv/mUfvb3r3D+99ju7X+f0I9OLZdPPY9/Jicn6ezZs/Tcc2a8Njdv3jTS1Px+UT8gAAAAYLVYgekLpvE7M/3UB2zabKqG0cfoO//EiR9eN5bUxfTF2L9jz+IN07fyPm8NIBa/T69w2iv/k038Nws03XA+kyP/g9M/5Vn7n/H75yfo/Z+Ll4vpf4O+848/ow8sA4/lOOGXH9B553z2TL9Jvg64cuWKx/jF8AU130pQPyAAAABgtejI9P/yhmnyE3b6t6/zXP5Duv5ta6bvfgygLLd70t1pMwv06S8/tfg5Xf8rzvvPbPL//7RT13Ni2vby/tdeoe989/t0/Z9+Rj/7UFYDrHrU5f3l8nWIbfyrYfiC+gEBAAAAq0XwTJ/NeeLbExav0pHnm5k+X8/H8hjhR/R+7nv0nfQH9Xo852uSbxUQ4xfU4+2gfkAAAADAatGR6XuX95+jdwufGMvm3xnswPQ1LL+8L8/u5fyS7zma+EdJcJv+z+n7z0tak3wBQ/2AAAAAgNWiM9O3N/JZ++PoU2Uj3yqZ/uDgCfr+orWRTzbh/bM90z9C0//fJ8axT/kCPuTjTj2yb+BDs8jCf2+SL2CoHxAAAACwWqzQ9Jfh+SP06p/FGo+vMs998xVjub/x+Kv06je9u+h1+M23lqgfEAAAALBarI7pg1VD/YAAAACA1QJ/cCdA4A/uAAAA6Cb407oBAn9aFwAAQDcxTH/r1q0NBgR6j3wO6gcEAAAArBaG6QuY7a8tmOUDAADoNo7pb9iwAca/Rsh9l/uvfjgAAADAauKYvo0sMYsJYXNfd5H7K/cZS/oAAAB6RYPpAwAAAKA/gekDAAAAIQGmDwAAAIQEmD4AAAAQEgzT/+xnPwsAAACAPscxfXU0AAAArUDfAUBw0ekTpg8AaBv0HQAEF50+YfoAgLZB3wFAcNHpE6YPAGgb9B0ABBedPmH6AIC2Qd8BQHDR6ROmDwBoG/QdAAQXnT5h+gCAtkHfAUBw0ekTpg8AaBv0HQAEF50++8j0v0KvnztHr0ddxx6N0ZtT5+j0a/vooYb8AIBO8dV3PHucps4l6OU/UI5vYM2yPhPf2N5YxuapI/TOuXfoyFOaNABAU3T67CPTj9FbFy/SWwes949+hd5MXaSLp4/SFzaoeQEAq4G/voO1mL5IU8ee8hzfcOAtunjxNB15Qs3vYucYTV2corGdmjQAQFN0+uxP09/wBRr7azb8vx7zGv5DT9HIsdfpzTffpOOHh2m7pG0fobE3X6eD7k7lS0c4z1Hat0U9BwDAjd++45nXztHF1HEado5toNhfsEb/6mV6WN5v2E7Dh48b2nzz1Zdp+LENZj636T8xQsffPE4jziBhmI5w/iNfqte5/Usvcx6uY2KMRp56qOE6AAgTOn32oelv484kTRfPv0WxR13pspR47iKde/d1OvL1I/SWrAK88zINDjxFY1N8/NVhK+8G+sqb6XpnBABYFt99x5eO07mL5+i4bdAbTL0mvvEwv99GB/+S9ZhK0Njhg3TkBA8Q0qzfzw54Tb9h1u9d3Rs8/A5dvDBFbx17mV5+9R1K8/le328NHgAIITp99p3pT/31FF3k/1989wgbej198JunvTONR1+md6QT2sNp33KlbTCXIs3OSD0HAMCN/77DO7g2l/YTdFCMnd8/tO0pGrQH6TwgSIiZf3VgBaav6nYD7Rs/h8E7CDU6ffad6Rsz/KfE0OUZ4hdog5X+lW/z7P1Cms6dO2eRNgYHRofx2foAwOiM0m/SV7APAICWrKTvMAbX547TM/bS/l/EHH1u++LLdPwvTzu6dLTp1/SfOEKn+XX6vK3vc5TmQcDFqTF6SnMtAIQBnT77zvQTL5rLedteTFBaOog/Mt9/4f+aoovvHKUvPDFIgy62PSRlHzaWF8+9ts/ojNLf/oqmfgCAyor6jj84ysbMg+vnZFaepjej1tL7EzLoTtM733qGntr+MA8EXGbu1/SN1QGu8z979T1o1Ke5FgBCgE6ffWf6zu79gW0U+29pY6RvbOZ77nVzEPBFc3PPQ18co3dOv04j2838G6JvUnrqNJ1Ou547AgCasrK+Y5COvHuRpt49zbNw12raU0cNMz/+RRkEbKDtL77FWtWYvrUPYOrVZ+jhDQ/R4NffonOO5gfp5Xd4wP4XMXOD7obtFHvzNL0zau/VASB86PTZx6Y/YHxP/63zPIMfl+/pb6AvfPMdo5Mwlw/P0TvfrC//28/y5St+7r0AAIDlWWnf8fA3Eob+vKtpPECXzXuiywus1xNvGY/nGkxf0fDUxFF6fcr7NV15bz8euDj1On3FvZkXgJCh02cfmb5fHqJtT2znmYJ6/Bk6fu4inf7WoKYMAEDHavYdGx7eTtsf7ny3vdQzuA1f1wNAp88Qmn4jg//5OL35V+eMTYAj1m5iAEBrwt53ABBkdPqE6TODz75MLx8eqf8gCADAF2HvOwAIMjp9wvQBAG2DvgOA4KLTJ0wfANA26DsACC46fcL0AQBtg74DgOCi0ydMHwDQNug7AAguOn06pg8AAACA/gYzfQA6JMz6CXPsAAQdnT5h+gB0SJj1E+bYAQg6On3C9AHokDDrJ8yxAxB0dPqE6QPQIWHWj9/YH//sv6UvDv4ftG/ot+mPP9e/SHwSp8Sr3gMAeo1OnzB9ADokzPppFfumDf+nYYKqOYYBiVviV+8JAL1Cp8+emP6DDz5In/nMZ4zzNEPySF61PABBptv6CTKtYg+r4dtI/Oo9AaBX6PTZddMXE5f6t27dSlu2bGmK5JG8HRn/UJQOxfE3tEHv6KZ+gk6z2GWJWzXBMIKlfrAS9u7dS6dPnzb+PPTk5CTF43Hatm1bQz4/6PTZddOX2bsfw3cbv5RR6/FDdLpEtftEtVqJMkNJKtSIKrlRIy09X6PihcYyAHRK2/rZHaND0Ujj8XVEs9j9zPIP7/t3NPHSlobjbfN3P6Rf07/SD/+8MS33k1/Rr39p8zH9Yj5L069a6af+gX7xy5/QNfu9jRy/9w901jn2GTqbfZ/ufmzWs1T5MV07NdhwLjeY7QO/iMGL0Yvxi9E/+eSTxnuhHePX6bPrpi91q8au4/Lly3T8+HHjdbvXk7lNVL4Std5HaPRUksZ319NKlxrLANAprdqrtD0eiVJtyaZM+YkBGs1ViBZzdMjKsx7bZ7PYW23aE7O/lfs6ffedL6ye8X/1Rfre3/0p/Zl6nPnBvxAt3TpFp/78ReZPKXfzX9m4f0jf+yqnn36flvhjog//gf7GXU6Of/I+pY33n6H0zY+JPvkJ/ZDPIfVM//2Paek3v6K7fz/ccD4buQ/qvQFARUxdZvc6c5eZvwwI1OOt0OkzEKYvAd24ccN53871JHIlqrBqa/dKVJrL0Kh1LHfSTPd0qkOjlMwVqLRQouL1jDMwAKAdWrVXP4buJ08QaRa7an4q+QvPG2Yvs30xfzW9OZ+hU+ksLfz0J3T3J+/TD5zZ9rfphz/lGXxDfsv0b77qOvYqffAJ0U+/+9uW6f8r/eIuz95/5MrjNv1XLtEvfnOHfqisBpx4/07jYEFBvTcAqLzyyivLGrs945f/q2nN0OlzzU3/wIEDdPfuXc+xdq5n7EyWCjxxqtzMUvbCJEUHvB1p/XWMX9eoupCj5ESCMnMVqn00S5OaOgHwQ6v2uqyhXyoR3c4oeSI0fqVEVXtloFqkdFxTtk127NhBu3btos2bN3uO79+/30hT87eiWeyq8bkRo3ebvv1azbccJ/7fn9CvrRm3Odv+mD44LWl/S3fpJ/QDTZlG03+Rbn7oNn0u9yqX/5Tr+pvPmHncps/npLuX6E80dbdCvTcAuBGzl8mvetyNGP5KZ/w6ffbU9KWzEdyGL//k/52avqB2rlrTP1mgWiVPY065GOXuERXPNtYHgB9atVdpe8ZgdMbizJiZpjP9Y3mqVHkQOmSWjV0pU+1WqqHOTtizZ4/H+MXwBTWfH5rFrhqfG9vkz/zfjxvL+yub7X+bFn75K1o4Vz924tzfUu5vZIm9hek7y/sv0vS1O/TrT39M7znL+2Y5Y0DxMRu9fdwyfVna9wwa/uJtuvb9SxZvY6YP2kaW9dVZvCzzq0v98r7V4MCNTp89NX17Vm+bv7xWDb/rpi8d7X3389WasflPOxMDwAet2utKTD8qJn87X8+bL/Fsf/VXomzj78TwhWaxq8ZnY8/s5bWYviCvxfT9zfaXN/ZmaWL69Jv6Zr6lf/kHeu8N14zeKTdMP/jprwyD/xOX6X9blvH/5W/rdZ7L0l15vPDTf6VfL3NOG/XeAOBGncHLAEAGAnLcPRiwZ/tq+eXQ6bOnpi/IBYvZyzN8ea0afk9M/06WIpryALRDq/aqtksHP6YvWI+rGsp3iBi/oB5fCc1iV43PZrmlfPdgoDli7HfomszEtWl6A25c3nfhMX3mq6fop5/+ihbedy3vS57f/Jhy6nnluGwIVOt0od4bANzYM3gxddvw5Rm+POe3j9tf5VNXBJqh02fPTd82fvfGPZV2r0ftXLWmP5Kl8v0y5Y5YX5UamqTZ2yXKTjTWB4AfWrVXtV06aExfXd6PnMjRbHaS9qplA0Kz2FXjE1Rj/3/+5ksG9vvlBgRehunaXdPAzefre+mH94h+8QNlef+rf0rvff8UnbVMekWmz/zJd3/MM3j+5+ze38t1/Ip+fTdLZw9Zeb71Nn3wMXk3/2lQ7w0Ay2Ev68vM3/6OvrrM7xedPtfE9FvR7vWonavW9Pl17HyRqvJ9fmtpvzqfppimPgD80Kq9qu3SQWf6AxGavMqzfXsjX61CsyeC+13+ZrHrvrInhm4buw5/ps+8OkU//YQNmWfjv/6UTCM2zN1l+ufkO/sf0wcps8xKTV++IfC9W79ymf5vGwOJaz/92NiLJOeVf0s/maITan0u8JU90A626avHV4JOn103/V7+OM/KiFD08CGKWjMqANqlO/oZptjhaOAfQzWLXffjPDLTtzfvLYdaphl/9uqLlPiW9Vy+pwzSiT/fq/09ABX8OA9oh3Vr+j3/GV4Aekw39RN0msWOn+E1wc/wgnaQZ/greX6vQ6fPrpu+gD+4A/qZbusnyLSKXTfbDxOY5YO1RKfPnpg+AP1MmPXTKnb8aV38aV2wduj0CdMHoEPCrB+/scsSt5igbnNfPyHxSZxY0gdBQKdPmD4AHRJm/YQ5dgCCjk6fMH0AOiTM+glz7AAEHZ0+YfoAdEiY9RPm2AEIOjp9OqYPAAAAgP4GM30AOiTM+glz7AAEHZ0+YfoAdEiY9RPm2AEIOjp9wvQB6JAw6yfMsQMQdHT6hOkD0CFh1k+YYwcg6Oj0CdMHoEPCrJ8wxw5A0NHpsyemj9/eB/1Mt/UTZMIcOwBBR6fPrps+/soe6He6qZ+gE+bYAQg6On123fRl9u7H8N3GL2XUevwwHB+l2G77fZIKNaJKbtR8vztGo/Hhev6JPJUX8zSuqQeAldBN/QSdzmNPU3GpSOmG4/5Jz9eoeKHxOABhR6fPrpu+1K0au47Lly/T8ePHjdftXk/mNlHpkv0+QqOnkjRuDwIulYhuZ+r535ilanWWJjX1ALASmrZXGVwu1agm3CeimvW6rQHnGCVnkjTWcHztaBq7LzJU4v8yDcf949U9AMBGp89AmP7p06fpxo0bzvt2rieRK1FlifvUe9yFzGVo1DqWO8npJ3NUusfT/qUKlRYKlDk60GD6wxMZmp0vGem5U6MU0ZwDAB1+22vn5tS5Qa42fmMfGIhRYmaWiguizxwlj0Ss466YjmaoIOluLC2bg/icmT4/S5mJ+qqdeV9jlMoXuUyRZqfHadg+r9SZ48H/TIHTcpRoei0A9Bc6fa656R84cIDu3r3rOdbO9YydyVKhQlS5maXshUmKDrg62WNJyt6UxAJlZ9I0OTLgMf3ICX5dq1BhOkHjZ3iAUK1RaTracA4AdPhtrw2mH09xm7Vm/rUala9OGoPN2JUy1W5njDY8EM9RucamGB+n/CIPXGWxYKn95ewdO3bQrl27aPPmzZ7j+/fvN9LU/K3wF3uUMgsc4z0ecL89yoZb4niLlBqSNJfpj0xSeob1a1H8iKh63bonl7hMlQfxZ8YpMV2gSq1Ks2+Y9ct9rVXLVBJzf5tNngf4djlD53xvKwt5rlNWSZpdCwD9hU6fPTV96WwEt+HLP/l/p6YvqJ2q5/2yy/tRyt7hTvR8fbQfmSpSrZK3ZhgANMdve1UfP6VvsdHPxMz3Q0kqLFUoL6tQPBPNLVapcCrGBlU1ZrFmmdWZ6e/Zs8dj/GL4gprPD35jH9gdpahjrJM0W7VNWx+TYfIfsT6NMgnz3hxzped4EH8rZbw2TH8+VV+dG+GBktQpZXWP8Za9FgD6C50+e2r69qzeNn95rRp+701fRO961mrMuvi92lEAsAx+26u3fZomX3DNbGWlykk/lufZLM9Y72Qp5tShN8h2sI2/E8MX/MYeeS1Ns/NlqlqrGiywZU3fXHmT1Q37mOQxVzg8GrX0LPe1PONeoncZucb0l78WAPoLnT57avqCPL8Xs5dn+PJaNfy1MX0W/YnG+gDwg9/22sr0haQ9mxXTv89G1yXTF8T4BfX4SvAXe4qKtSoVz49b365pMtMfkrzq4zXJU6bsMkvwcl8rV61v6Ri4Vk0aTL/ZtQDQX+j02XPTt43fvXFPpd3rySzIV/Ri9ffuTnaaTf9ert6BujqDxFzNWB60N//ELhWpfD1FezXnAEDFb3tturw/EKN0fpZSR8zXucUaFc+OUvaOe3mfDev+8ua3FviL3Wvakdd4QKOd6cf4HrmexzvIIziezefsDbYRmrzGpWbGjXS5r8bKnFV/bKbMHUHe/JZDg+k3uxYA+gudPtfE9FvR7vVEzhSoKl+LWswZz+M9naw8M5VlfO40c+oMYGjS3CRlLfFTrUz5E9jRC/zht72qK1ED8TQVq/WNfLWFjDEoNTby2TN8ZyOflIlQcq7KeatUmGqsfy3wF7uYdIW1Z8VaYdvVzfRlYK7+szVq3CsyNWqsyBcpbS3/G8v712eNxyEN+m0w/WbXAkB/odNn102/lz/O0zHqD/gA4INO9ROJHnL9qNT6YkWxi74ORzv6Oqzcq0PRZQbkQ1E65Lf+VbgWAIKOTp9dN338DC/od7qpn6AT5tgBCDo6fXbd9AX8wR3Qz3RbP0EmzLEDEHR0+uyJ6QPQz4RZP2GOHYCgo9MnTB+ADgmzfsIcOwBBR6dPmD4AHRJm/YQ5dgCCjk6fMH0AOiTM+glz7AAEHZ0+YfoAdEiY9RPm2AEIOjp9OqYPAAAAgP4GM30AOiTM+glz7AAEHZ0+YfoAdEiY9RPm2AEIOjp9wvQB6JAw6yfMsQMQdHT6hOkD0CFh1k+YYwcg6Oj0CdMHoEPCrJ8wxw5A0NHpsyemj9/eB/1Mt/UTZMIcOwBBR6fPrps+/soe6He6qZ+gE+bYAQg6On123fRl9u7H8N3GL2XUetohPV+j4oXG493g0JUyUa1IKU2aynB81PX30w9RbpGLzqca8oH1QTf1E3R6H3uaiktFSjccNxm/Wqby1fGG4+uFTq+/0/Kgv9Dps+umL3Wrxq7j8uXLdPz4ceP1al1P5jZR6VLj8a6we5ySp0Ypoh7XoF7X8ESSkkciDfnA+qBpe53IU3mpRjXhPvHoznq9mKdxNW9Lxig5k6SxhuNrR9PYu0KGSvxfpuG4yeT1KlWvTzYcXy90ev2dlgf9hU6fgTD906dP040bN5z3bV/P0Cil8kUqLRRp9sI4ZRvMNUOz89xlLBQo5zHoYRqfnqXiAqfN5SgRd9XJZp65LnWWqJBL0uiQeXx0mus4w+eY4zK5BA0czVBhLkOjUkZe87HYVN6qM0vj1sw+kStRZYn7/nty3MwvdRWmR61zRmj0VI4KUm5+ljITw861mOf0xuhnkAG6i9/2qg72Vk5zw1sL/MaeyBUoc8zSC7fd/FmX/gy9JGl8psBprD85xlpO5uR9iYrXM45+nHsQT1FetKxoxGt6y2vJuJ7XrOuZz1OKB93DE1kzr0uvjfisU/qYkzFNeZPIa3z91r2YnR6nYet4/fpHKWOku+H6j1p1LNMv2eXNe+lNGxhIUI77nEmjX7LritA4v9fFA9Y/On2uuekfOHCA7t696znW3vWMUb5CVOVOIzmRoMx8WSZVTicbOTFL1VqFzTVB42dyVKrWqDQdNdLGrlbYhGcpPTHKwuVySwWr45mk2Y9qVGGhJHg2nr/DM7SFDEUHTHHVuL5SPkvZM2M08AbXX52lSSknr5eqVLmdN69ljuuvFijJ4hs7wx0LX2flJpe7MOnUZXdUsUslzlsyBhQJNvlKrUqzJ8xVAPOcZSoaMfAM0ojPjAGsHX7ba4Pps3EVKtbMnxtr+eqkYYSxK9wGb5vtbCCe489ZTG6c8ov8gctiwVL7j6127NhBu3btos2bN3uO79+/30hT87diJbFXP7LbruiPqJyNmemiF46/spCnrLGSEeP8tbqWRT8fsbYM8xLT57TF5TXSVEtv1K+nVpG0BKWvsyBFr3dYr2+bOqdbae2AWlundW6jzmqZ8kZakfhKnPN5kHjvV3mywAOdiTTNchuoXB1Trj9Kkxe4j5ixmOcbJv2L3AOlX8otVD39ElUrxoTCSeO2FDPOzffuvtw7HpDMpGlyhPNfk/xmPOPnZzmeCuWPaa4ZrEt0+uyp6UtnI7gNX/7J/zs2/VMFFpxlugbmIMDsZKOUZSEXz9eX0CNTRRZ93phpZxbYhHP2zINH/LvNfNFsmehO1ux8haFxSlnLqw3LaKrp3y9S2hlhy/mlkzMNWu3863UlqMAdeuFkPc19Deo5R3mwQrewF2Ct8dtevZ97hNK32OhnYub7oSR/9tzhGrOvGOUWq1Q4xebHnXbpkpVnlWb6e/bs8Ri/GL6g5vPDSmKv5E1jMzhZqA+u3dpR0wzc+jFNvzhV13JU9tOwsYl+vVryGlgsV9eLXE95xq5D6ixTbsTKq16PQ3N9euscoNQtjvmqvYLnJkLRaH1GHZkxr19eqxo3iPP1uQYXcs6ae1AylKKi1XYM07+Xs0xekHZlDz7MOLNOvyRloxR1VjUixn3ubDUKBAmdPntq+vas3jZ/ea0aftumzyNwWzg29U6WR8ZV1/NUY2ZF5sh5QFYBzFkzjxqobC31SXmtAC0a0lTTX8zVBwtK/uVNX9Opu+ptOKcmZtB7/LZX7+dumnzBnsnNmCtATvqxPM+6eFbGhhJz6tC0jzaxjb8Twxf8x85mecp9zBWLarKadu3ViGJcWo1IPnNVxKN5q17vZ6HcV/V6HDT335V3eV2r9cSMRwGle9X6Xo/lTN+a1dcHfpax33fFtWR0ZoaxN5T3XJfm+uOy5F+iStVcbaL7MP1+QqfPnpq+IM/vxezlGb68Vg2/I9PnDrK+JOcetYrpy0hZU87FcHyckjmZR3CnwqP+8WuNArJpEJdq+kqnkbzJHfg1c1ft8p2DpkOTxxIfzRqbvhrOqekcQe/x215bmb6QtGemYvrcAde6ZPqCGL+gHl8J7cXOjOS4pTcxfY+WrbZv6Efugb0iYiGrfNaqXVMtLXs9KzH95fWpxtigV4vRXIVqPClIHI6aMbp07C0TodSt+iPFVvXaad7Vv6jx7aDiWXmttp9Ryt3j3i6XoEPR+iMKmH7/oNNnz03fNn73xj2Vtq5nJEvl+/UlMONZKNUbcGKuZnwtzt4wE7tUpPL1FO0dOETp+TLNnrLKGUtlXM/EgLnMaDxPNctEpHOxlh0bhKeavoy8nWthsdXqy4Lm44SYU7Zel7mMKa/NDi9mzJBqcwkln3VOmH4g8Ntemy7v82edzs9S6oj5OrdY4456lNuDe3mf2+b95Y1sLVhJ7GLkMeN9xDQn+9GZarINWnbrx5zBuzUimrEfHahaKrse201eY8ub0Q28/Zp+c32qhtmgV+3xYaMd6Ezf2D/g7GVwYTz+KFLKXpbn+1Nc5LazzzJ9aSN2nyWDEudRo2r6ymRod5qKrn1QYP2j0+eamH4r2r0eQyQyO5Ilr2qR8jelw7TShybNjVDWEj/VypS3OpXY+SILwyonG4quJ62RNXcUV8tcp1XmPs/MpmJGmQZBq6Zf5XmMvUnrfn2TluSNnCkY5yMe7XtnJ5weZ+HZjyLkMhfzjugbzgnTDwR+26tqCuZnbbUR+bwXzA1XxkY+2yCdjXxSJkLJOdnMWeV22Fj/WrCS2Cu3S8aGPfPRGhuR/S0Zjcl6NOnRjznbnr1WMe9ZM40oWnKfsz3Tb6zTfW71823Qq1OHDGLs/ob7qNsVjembgxvvP/vZvLdfct8fo/z8rLFR2eyzqlQ8H7POrZq+3Wda9VQ59R5Mv5/Q6bPrpt/zH+cZitIhe9lMx+4YjcZ1X0sZptjRQxRVR9V2nUdjzipBS1ydxnB8mTpbID/gYy+5gWDTqX4i0UOuH2taX/iN3TFE0ZJWfzqaaHLAvG9+NOI330roXJ8Rih52/0hXO8j9Wa5fapamsNL+DawbdPrsuumH8md4m80UQN/RTf0EHb+xq7NgAED30emz66YvhO4P7oxMUtr6Dn5DGug7uq2fIOM3dvl9CmeTIgCgJ+j02RPTB6CfCbN+whw7AEFHp0+YPgAdEmb9hDl2AIKOTp8wfQA6JMz6CXPsAAQdnT5h+gB0SJj1E+bYAQg6On3C9AHokDDrJ8yxAxB0dPp0TB8AAAAA/Q1m+gB0SJj1E+bYAQg6On3C9AHokDDrJ8yxAxB0dPqE6QPQIWHWT5hjByDo6PQJ0wegQ8KsnzDHDkDQ0ekTpg9Ah4RZP2GOHYCgo9NnT0w/dL+9D0JFt/UTZMIcOwBBR6fPrpt+KP/KHggV3dRP0Alz7AAEHZ0+u276Mnv3Y/hu45cyaj3dIj1fo+KFxuPCoStlolqRUpo03+yO0ajvvx8O1iPd1E/Q8Ru76Ky2kNX+5cnoTIlqS0VKa9K8yN+gP0TRIW+9y+kXgLCj02fXTV/qVo1dx+XLl+n48ePG625ej0rTv/O9e5ySp0Ypoh5fCZdKRLczjcdB39C0vU7kqbzEhifcJx5EWq8X8zSu5m3JGCVnkjTWcHztaBq7C9EZUYXyDX9ed4zyFUkrUUZTzsskzVarNPuGt95l9QtAyNHpMxCmf/r0abpx44bzvt3riRxJUm6uRKWFIs1eGHfMOpErUe5kPZ/7vdlpxCiVL5rlpsdp2K7zaIYKcxkatd4PT2Rodl7qL1BOGQxo007mqHSvRrRUMY5njjZeM1j/+G2vnRtUhq3Rjzn2jpXEXmXDrs0lvGknC1Tj41V3XPEEZa+LHktUyCVp1JjZj1JmrkxVHjhV7/BdyJn1GPd0Zpyylu7zZ126HBqlZK5g1FO8nqZx1woBAGFAp881N/0DBw7Q3bt3Pcfaup6hFBVr3HXMJGh0Ik2Fj4jK2aiRpna27vfyulYtcyeSpPG32eTZpKvXJ82O441Z7qhmaZJfR07w61qFCtMJGj/DZl6tUWnarN+bxjO7mpV2LEnZmzyNqRQoO5OmyRHNdYN1j9/2qrbDgXiKChVr5s9tpnzVbHexK2Wq3c6YS+HxHLcnNsT4OOUXazIlNvK3u6S9Y8cO2rVrF23evNlzfP/+/Uaamr8VK4r9SpZjKVLaMd8IpW+xTq/k6oOZER7Y8L2o8GA7cZTN/zbfm1spvi9RmryQpxLHXspnKXtmzKmXqiWaPZ+gxHSBKly2OGXWnbrFWl7Icj3jlL5ZJbqjf7wAQL+i02dPTV86G8Ft+PJP/t+x6U+w8S4VKbXber972Jmxq51tg+nPS6dipY9wJysdkHRMjulHKXuHO5PzEaeOyFSRapU8jRpp9QGGkfZayumUsLzf//htr952KIbHRj8TM98PJamwVKG8sRoUo9xilQqnYpRZqBorUWaZ1Znp79mzx2P8YviCms8PK4vditnWyggPAu6XKStG74prOBqt61EG1NbAe7nl/fJMXZeT16vGoH1gYJxmP2LNnrX303B/YPcNAIQEnT57avr2rN42f3mtGn7bps8dZXqeR/P3eXR/r0SFmfoyfSvTd3cano7FMX055noea8zMZIZhp3k7Ig8w/b7Hb3v1tkPT5AszPGu1KFRc6cfyxqy1yrPTmFPH6pi+YBt/J4YvrDT2yPkiEQ+WZV/CmDzMv5Vmg3fHFaHxC7NU5EGPV2eS1qg1Vdt10x+gGJ9LHgfUqhUqzWVpHKYPQoZOnz01fUGe34vZyzN8ea0afvumbzEUpUOyTM/9if38UO0YVNOvXB111eGacXlMnzubE5rzGTOK5dIGYPohwG97bWX6QtLe6CamL4bVJdMXxPgF9fhKWHnsCY67RoWT9v/lmCsuWUGrFik9ETMH7a5HbCs1fRPZ8Z+gjDxmWypQQnNtAPQrOn323PRt43dv3FNp63re5k5yod5BxnIs8gXTbDMLPFngAYB0IpEjsqToNX1jJmE9Z4zNlJ2ZiLvDSczVjMcA9upB7FKRytdTtNdOY2M3zx2h5M1afcPSNJv+vZyr4wb9ht/22nR5X1aq8rOUOmK+zi3K0vQoZe+4l/dTVJTl8ABtSGsndmOGz4bv6Mxt+jJI5oGOubzPs37J65i+tWQ/VV+ZW970E5S/V6Js3EqL56iyigMmANYDOn2uiem3oq3rGZo0Nzo5S/AseGvWFDkhm+vY3OUrU5VZmr2jLO9fnzWWUqUc1cqUP2F1Ku5ZhlK/J587Tc5TKVDK7mzkWa08GuDOOofd+32J3/aqGtRAPE3Fan0jX23BHDgaG/nsGb6zkU/K8IByrsp5q1QwNqutPW3FLs/yyb0PxmX6rKVZ+QqfoaUaD+TLrpk+DxiyZeOrj7WbqcZ6B9ymH6HJq5K3fn9LWWufDQAhQafPrpt+r3+cJxI91N6P4chjgcOuDUTCqYK1Wc91rMmP7bR9brCu6VQ/0m5i6/R5c6exL8dwfJQORd17bdpEdH3UelQAQMjQ6bPrpr9uf4b3WIaK8nUq9XvFACh0Uz9BJ8yxAxB0dPrsuukL6/IP7sh37KftHwYBYHm6rZ8gE+bYAQg6On32xPQB6GfCrJ8wxw5A0NHpE6YPQIeEWT9hjh2AoKPTJ0wfgA4Js37CHDsAQUenT5g+AB0SZv2EOXYAgo5OnzB9ADokzPoJc+wABB2dPh3TBwAAAEB/g5k+AB0SZv2EOXYAgo5OnzB9ADokzPoJc+wABB2dPmH6AHRImPUT5tgBCDo6fcL0AeiQMOsnzLEDEHR0+oTpA9AhYdZPmGMHIOjo9NkT01+Xv70PgE+6rZ8gE+bYAQg6On123fTX7V/ZA8An3dRP0Alz7AAEHZ0+u276Mnv3Y/hu45cyaj0dsTvW2d+591le/gZ4/e+iH6LcIlFtPtWQD/QX3dRP0PEfe4xS+RJVl2pUq1aoODNOEVf68MkclT7itKUqVebS3r9uGU9R/naV02pUvVek7GsRT92esvNZGm/5lzEjNHqhQJWqWaaUS9BwQx5hjDXMeebTmjQvkdeyVLxnXePtPKXi5vHxq2XjmJcy5Sca62h1XZ5zLM5S6oj3Prhpej+HRik9VzE/i49KlDvZpG/bnaCcc+8LlPacs/n1grVHp8+um77UrRq7jsuXL9Px48eN16t+PZdKRLczjcf94rN85jZR6VL9/fBEkpJNhAn6g6btdSJPZbuzv088CrReL+ZpXM3bkjFKziRprOH42tE0dhdjVytUq8xSMh6l6H9NU4ENqTQdNdOP5alyv0qF82MUjU5S7g7fn1spa1AwRvlKjSrXkhSLRmnsfIGqtRJlRqy6pWytQvkzhygWH6PMLS67kKGo5hpsImeL/DGUKXeCr+WYXAtR5epYQ77YFTZs/rxaan8oRUXOV5yW649RIsflPpqlSTlX9BCNHh2t8wZfL5Upa1+/3+sayVCJz1FmY43FrXPUipTSDXCa3s8IpeQe3cnRpH0/7/P9O6apx7j3RNWbaRrjvJPKOZteLwgEOn0GwvRPnz5NN27ccN63ez2RI0nKzZWotFCk2QvWTEJGvPdYuEsVPl6gzFEr72s8e7DzTo87I9TR6QLlzoxTVtJYYMuVV0nkSlRZ4j79Hpeby9CoVVdhetRK57KvWfXO541R+vBElgoLkp9nJ84KAbN7nDLXi3y+EhVySe8oHQQOv+1VHRSuHO74+b9Mw/G1w2/s6Xk2xQv197EcDwLmEsbryes8k7yZrOcfybEtcpxGu09TcalIaaeuGOVYj4WT5vvkTR4Q5GKuspOUvpQ09Kdeg0nE+BzKV6wBh3CqQLWqadLOsThfAxtaNudjwC8DO88gTgYBXPbLjXkTczUjVvcqh0mL65KJx2LONZiJUPaOtCdzUhE7maHMyZjxuun9HJI2xEbtGnTIPaxenzReS7+YnbL6zjdmqbpUoKRzzqixemmes8X1gkCg0+eam/6BAwfo7t27nmNtXY8x2q5SaSZBoxPmqLOc5QZ5LEnZmzxcrRQoO5OmSWns0pjvy3JUksY576zMJKwRqiEYnjmU8lnKnhnTl1fPzYydYQOXbDe53IVJQ5xSly0mEUitUuIBRYLS1zmjLLvdyVPy7STleSROt9Km0IYmaZZnQRUeOCQmeBCzUG05cwFri9/22mD68RS3GWvmL7O4q5NGGzBmmLetz9wwH+6w4+OUX+R2IosFS14DXQk7duygXbt20ebNmz3H9+/fb6Sp+VvhN3YvEUrfErOWAbFtXu501kC1SrMn1HLMEA8CWJ85Y/A9zlrhfFMJY7BfXuRB8kx9AK/HqvsN9zHTCLPO4DrG18Sfx5WY71U+D8bqA8+I1eMjWSrf18/yW16XXMedrGuwYN43s3+JGq8lfW+r+3mC+z7VmF11y6CEOD3BryMz5YbY631ai+t11w/WDJ0+e2r60tkIbsOXf/L/jk1/QkalLDR7xrx7uC7+BuFGKBqtP8dyN263UTs0lNejduqq6Zdn7KV+ZbQtgxBLiNEsd/j2AECQwcxShfLLrDCAtcdve/W2D9P4yjMx8/1QkgrO58yz2cUqFU7FKMODvtIlK88qzfT37NnjMX4xfEHN5we/sbuJsZ6M5W/DHHTmod4rG74ft81ZqakPKSuDoAoVp3mw/3aGirIcbafLXhzX0vqhqOhPdw+91xCd5uur5M3HKIr2Zd9Ovc5DFFUNzhq01z8zm4gxo7ZXNxppcV3GgIHbxNlRji1Co2cLxKE39lWt7qeuL3P1P+7jzfvCFter1AXWBp0+e2r69qzeNn95rRp+26bPHUJ6nmVwXzacKCP+hoYuz8QKVLI2xRjPWntg+vU0RTAu0UkZicG98YelDSEFGL/t1dsGTJMvzGQpayErRU66MVvktswzsJhTh66jbQ/b+DsxfMFv7DaG4RsrF/Yxa8l42p1PZvA1HvS4j8kAqGasgMScY6bpe5aY5b7Z9+hC0aOj8tVxMu8768mzkc41CDdWDF3PuBXty2OKZTfkieG7Bx1uZMVm2Vm+0OK6+H1sapbKS8Y8ydgTkp3T9FWt7qcswfOAy7OfZFp9dGASvcKToQVvvzd+zX500Pp6wdqj02dPTV+Q5/di9vIMX16rht++6VsMRekQj/ilA3VG1YpwR+V5IjfyxOGoKU5XehBMv+H8IND4ba+tTF9I2mZjbMbiNtwl0xfE+AX1+ErwG7sQkaVl2fil7L5P3SKq5F0bwGQJXzaXOatbEfOx252csjN/1NhoVjzrOjaUNZ9fa87vKXPedQ3GvTaX48XUPINuGXPL+5YbL61ViJsp1+dl02qWLzS/rsZvEMkz9Zo3doum9/OoWWfadR/H5MS3NN8yOluUilwbR2V1SjbryWOZFtcLAoFOnz03fdv43Rv3VNq6nre5wS3UO0jZKOSMUmUkey/npHmNddhYZm1q+kr55cgskGdTUTumP3CSR+LuxxTxDBUXZym1r/F8IBj4ba9Nl/dlpSovX8MyX8tXxYpnRyl7x728z7NQmS2qS8priN/YIydk5UKeK2u+zSJt3pn9mwYvz5jNmSe/l53/zuMAL8a3AjivudnVKusxqkbkERo59ZlmbRtyw257me3yYGPUniBo4c/uVlVZhXDRcpZv0uy6TEPlOqwVkuGTMoCq76R3b+Rrfj/N5//OagT3L/KtAHtjpGcj30CCB6b1RxXGoM0VR9PrBYFAp881Mf1WtHU9Q5PmRif7K1FLJcrasyZ5XioPwLjBGhuAjIZuboiqyea/25Xmpq+WV89tETkjX38hY6lMdg+3ZfpGJ1emmj3buF/f4KWeDwQDv+1VXQkaiPMMzPiOs7TDmrFhMzZgbeSzZ/jORj4pwzPGOdloWqXCVGP9a4G/2GV52VyW9vxzVs9cbd54msUzUXv5X/bqqOXIfR/rj/Uayi6Lt4zM4nUDCgM/q3wyKWj4Zz+S8zPLt2l2XfY9MvstqpUp7wyg3Bv53HmXuSdGuyOzr1T6F/dGPnkvg7Wy1VfS/SrP7GM+rxcEAZ0+u276vf5xHmOk7uOHdEQY0cPuH9PxiRi0Im/517jpqFOGKXY01mInMggCnepH2uyK22FA6DR2D/Jozpd2NXDZmLFRT5O2HLtj1uY+Tdpa0vS6uF9ouurgosX9HI5rNiJqkb6ySV/U9HrBWqLTZ9dNHz/DC/qdbuon6IQ5dgCCjk6fXTd9AX9wB/Qz3dZPkAlz7AAEHZ0+e2L6APQzYdZPmGMHIOjo9AnTB6BDwqyfMMcOQNDR6ROmD0CHhFk/YY4dgKCj0ydMH4AOCbN+whw7AEFHp0+YPgAdEmb9hDl2AIKOTp+O6QMAAACgv8FMH4AOCbN+whw7AEFHp0+YPgAdEmb9hDl2AIKOTp8wfQA6JMz6CXPsAAQdnT5h+gB0SJj1E+bYAQg6On3C9AHokDDrJ8yxAxB0dPrsienjt/dBP9Nt/QSZMMcOQNDR6bPrpo+/sgf6nW7qJ+iEOXYAgo5On103fZm9+zF8t/FLGbWeXpKer1HxQuNxD7tjNOr6W9WHrpSJakVKqflA39NN/QQd/7HHKJUvUXWpRrVqhYoz456/CT98MkeljzhtqUqVuTSNuv/OezxF+dtVTqtR9V6Rsq95/3a7p+x8lsZb/o34CI1eKFClapYp5RLL/K34Mcotcp75tCZNYWicsvOV9uJTiBxJU5Hzlq+O14/v5voXzHtQ+6hE+alYQ7l63gTlnPtVoPQR9/3yGzszNErpOSsmPmfuZL2/E1YSE1gbdPrsuulL3aqx67h8+TIdP37ceN3N6/FD5jZR6VLjcQ+XSkS3M/X3LMrkqVGP0EE4aNpeJ/JUlk5TuE88MLReL+ZpXM3bkjFKziRprOH42tE0dhdjVytUq8xSMh6l6H9NU4HNojQdNdOP5alyv0qF82MUjU5S7g7fn1spS0tjlK/UqHItSbFolMbOF6haK1FmxKpbytYqlD9ziGLxMcrc4rILGYpqrsEmcrbIH0OZcif4Wo7JtRBVro415IvxQL7Gn5dH51qilFlgg72VobHoMMeXpRKXK05Z6U3jcxOhyat8zqUylXiwUb0+6dSfvUNUvZmmsd3DFDszS9X7HPMxtbwg98vKy/drMicx8GTEMmS/scu1pORe3snRpH3f3ef0HRNYS3T6DITpnz59mm7cuOG8b/t6eGSazBWotFCi4vUMje+203jkO8fvJ7JU4LTSXI4ScW+5VL7I5Yo0e4FH1K1MX0a497gzWKpwmQJljvKxoxkq8DlGOX10ukC5M3adBcpODPPonWcr83zu+Tyl3CPvZa8ZrBf8tldfg8mmZIhbEGUajq8dfmNXV89iOR4EzCWM15PXeVZ6M1nPP5KjssRpGBXPepeKlHbqilGOtVc4ab5P3uQBQS7mKjtJ6UtJQ4fqNZhEjM+hfMUacAinCjw7n6VJd744XwObYzanDO61sIYvpWnSHogMmDHZpt08Pjfc91zLGn2Au7zcg5Ji8u62FHktRdkpa2XhDR4QLBUo6dQZpdyi5JU+p0XsQ+OUmkmZKyVD0tZ4cOCKSe71ymMCa4lOn2tu+gcOHKC7d+96jrV3PTFu0NwoF3KUnEhQZo47lY9sIXMDvs9pd/Jm2nyVh8J2mjUytsvNy8i4Red8LEnZm1yowoY+Y4ldxGbVaQiiWqLCdIISMyWe4bGAF4uUeds6dyVvzdaaXTNYL/htrw2mH09RoWLN/GuynDtpdNzGDPO2NVs1zIc70/g45Xn2J/8kf8vHT8uwY8cO2rVrF23evNlzfP/+/Uaamr8VfmP3EqH0LTHrUeO1zGK9epuk2WqVZk+o5ZghHgTwzD4nA202ydmPON+UDOrZohZZczPjyy9Xu+t+w33MNLisY1gxvib+PK7EGlf0fCAD/GLVHpisMD4Lr+mbM/1K3owtciTLbaI+CEjM1Yz+LCFpM+WG663X1SL2kzwAIE5/m1+fqPdnTl65F3ey3Ebbiwn0Hp0+e2r60tkIbsOXf/L/jk1fGqxjpoLMCIiKZ+W1KmoWpYycpeNoGOWbg4Cmpi+onYFi+nXBihi4Azhll3XN1ppeM1gv+G2vXtM3ja88EzPfDyWpsGS1SWkHi1VuMzwoXKhyGSvPKs309+zZ4zF+MXxBzecHv7G7ibF2jMGtoUedEan3ysYaJF83B0dmWRkEVajIA+zRtzNUlAG8nS77bo6OOhyKymxXdw+91xCdLtV1qeh8OF6vb/ToIYp6ZrZStzEso8q1lPWIYSXx1fH2IWzmx7juqlG58a+St+9B83IGTgytY28s4zrm9HH6Mq1iAr1Hp8+emr49q7fNX16rht+26UsjvW/NmlzPUM1GqDZ2V6PVNG5fjVct19T03QJxXUvTawbrBb/t1duuTJMvzGQpa1FwDzaNZ9WyOpWlmFOH2o7bxzb+Tgxf8Bu7jWH4xsqFfcxafp5255MZvHugLMgAqGasgMScY6bpe5ar5b7Z9+hC0aMtc2Oc3HfW44S7btdS9lDKWElwltIVnctjinqdZcp76jGJWM+4q9ekD/AbnxdPH2JcU5UnA+aeoUg0aZR39kS4iMqG4gVvfzZ+zV6KbxG7uy6ZDPHAzLPvhAdDtJjjwUx7MYHeo9NnT01fkOf3YvbyDF9eq4bfkekbS0+atIbOUjF9Tznd0pWG1TL9Za8ZrBf8ttdWpi8kPRuleM7YJdMXxPgF9fhK8Bu7EJElY9lEpuy+T92SmatrM5ks4dsrccaxiPnI7E5O2Zk/aqzKeVbGhrLms2XN+T1lzruuwbjX5jdvxCA9A3F5oiLvm228HIrSoaMx72OFqaJjmq3ja8TTh5wtuh5HmuiW8Z28ntVDWVGSzXryKKV57J56jprH0677PSaFb6WM1+3EBHqPTp89N33b+N0b91Taup4RFvt97lDsTXJDbLa3S5Q1RrVqZ+kyYqOcPIuyyskzVPJh+jLqvZerd8jtmH7TawbrBb/ttenyPs9k0/lZSh0xX8tXxWRml73jXt6Xx1Lux1Rrj9/YIydk5cKlMzfymMuZ/ZsGL4Nhc3lcdrRbe100cRvfCuC85tfFrLIe02skmmWFO/WZjwzsTYWR6CHPI4FRmTnzYGP0cLTJ4Fw+lyoVnK+0DVNijq/jVtos0zQ+PZ4+xDBg/tydfkLahfkYw7hm90a+gQQPJmtOmzEGWlLWmsk3i92zkc/+xoD9qCSeMb6RYG+gbCcm0Ht0+lwT029Fu9cTO1/kBm5udJJl8up82jLlJqYv5WTJ0S5XLVL+pnS0jfV7kGew8oxNTFtGt+2YftNrBusFv+214bFRPG1s+DJnlDXjq2axAWsjnz3DdzbySZkIJdlMamyeBfvrYGuMv9hl6bf+PNr558xUra+qyYxaZtaswbS9/D/BulLLkfs+8mBJNsfqyi6Lt4zM4nUDCgN1RW8ZYlMFY2VGKjT6Eq4z4XwTp0l8y+DtQyI0PlPy9BPua3Zv5JP3MsAqS1ycl3gwUjwfc9XdJHb3Rj55b7RPO6b6RtN2YwK9R6fPrpt+73+cJ0LRw+oGGx/IEp06mhcj93Q15r+WA4IV0+Y1g0DQqX5kdhlbp1/V7DR2D6JB1w9erQguGzM26mnSlmN3zNrcp0lrE9not+xn2Ul8BivpJySv8sjBzQpiH443OWfHMYFuotNn100fP8ML+p1u6ifohDl2AIKOTp9dN30Bf3AH9DPd1k+QCXPsAAQdnT57YvoA9DNh1k+YYwcg6Oj0CdMHoEPCrJ8wxw5A0NHpE6YPQIeEWT9hjh2AoKPTJ0wfgA4Js37CHDsAQUenT5g+AB0SZv2EOXYAgo5On47pAwAAAKC/wUwfgA4Js37CHDsAQUenT5g+AB0SZv2EOXYAgo5OnzB9ADokzPoJc+wABB2dPmH6AHRImPUT5tgBCDo6fcL0AeiQMOsnzLEDEHR0+oTpA9AhYdZPmGMHIOjo9AnTB6BDwqyfMMcOQNDR6ROmD0CHhFk/YY4dgKCj02cfmf52Gv7afhra4jq2OUJ7Xxihpx99QJMfgNWhqX62DNH+r8Upzhx86TC99HXzdfz5Idqi5m3JJto2uI02NRxfO5rGbvN7n6cXok/SVvX4g4P07Iu7afsDmjIWWz63n/Z/bkvDcQBAa3T67CPTf5z2Hn6Bdm613m/k918/SHsf26jJC8Dq4Vc/j3/5MLfHxuP+kTa+lx5vOL52+It9Gz39tRg9/Yj3+AM79tHhfYP0QEP+Olt3vkAv7NzacBwA0BqdPvvT9H9nK+0ceYlG/tDbWWz6bISefuZZevZLO+nxLdbsf8sgDX9p0DML2fTE0zQ8iNkF8Idf/TSY/kY2w/9kzfy/HucZrdleN7IZHvzy46YZbozQvjgb/cYtNPT8QXrp8Et0kPMPb2+s3w87duygXbt20ebNmz3H9+/fb6Sp+VvhN/ZH/ihGsT96xHVsEw1FXfdj86P05B+xNp8Zpp2PbXEGAm7T3/T7n6fP//4mpw71/QNbHqedX5I6nqbIZ+vHAQgrOn32n+k/bBm+MjvY+NheiseepcjvbaFHHnua9sdHrFWBR+jpF92zEC7/QuOsBIDl8Ksf1fS374nR3kFrJep3eADwYpSGNknaRor8MbfB39tI2595wbVatToz/T179niMXwxfUPP5wW/sA1t30gsvPk2P2O83DVH04G7a/jtm2shLMXo2so22bHmUPh89SNHPmabtNn111u95/zDXEd9PTz/2CG35vQg9G4vTs7+Px3og3Oj02WemH6eRkYN0+PAIPfmQO02M3XtsY2Q/Hdz9qPFaOg9nFvLI0xRzd04AtMCvfrymL0veURoeHKRBi+H/5Ep/iE0xfpBiewdpo1PH6pi+YBt/J4Yv+I1dZvZPfjXOAxnz/aYnRxz9CQ886DLowb10+MuPG6/9mf4DNLjvIO12r35sG6Z4dChQ+x8A6DU6ffaZ6R82lkW3yKx+ZCdtlVmEk2YuixpLqcZy6ktOxzLw0JM08rWnaduAuQw58iSWBoF//OqnlekL2+yBqZj+N16ieJdMXxDjF9TjK8Fv7MKmz0Uto5cBgHs1bSM9Enma9kZfMLX5jbo2/Zm+rM4dppfiLn3HuY4XdjZuHgQgROj02Wemb2/k28gd7EE6+Mx269mg2VkOOoMAFXsW0rgiAEAr/Oqn6fI+t9ntT+6kR53l/Tjt/g+baHBvzLW8/yjtPtisHfcev7EbPBihfQd306PKUv+m/7ifDv7xED3yu9Zs/7GVzvTNR3Kff1hzTgBCjE6ffWr6A8Zmvs+/YO/el+W/l2hfpD6D3/qHe+lZ12Y92Ul88AWeafxxpOluYgBU/OpHNf2BjdtpmNuosQL19YMU3/O4Mas3NvLZM3xnI59ZZtsXXqCDX3+Bnt7WWP9a4Dd2E3MZfmQk1mDesc/b7x/gwdBBrelv+cMR475skkHPA4+wvg87acZGwS9uc7S78bFh2vf5R6FlEGp0+uxf0xdkc89LI7RTZgBGB/uSuQQY5/+/MEzbrY7U4MFB2vfyYdr3B9j8A1ZGx/p5cCNtbPJd9SCz4thlFq/uudn4OD0btx6/xWP07Jf3a03f1vDhl0THz9LOL7rSeJA/9Hzc+h2Eg5y+n4Yw8wchR6fPPjJ9n0gH+6DuOJv+SzyjCtDSKVgfhEo/CqsZ+wO/u6nzwc8DG2nTRgzcARB0+gyf6Wt45LGd9PT+gxR7eltDGgCtCLN+whw7AEFHp0+Y/sADtHX7IA3+h/oPggCwEsKsnzDHDkDQ0ekTpg9Ah4RZP2GOHYCgo9MnTB+ADgmzfsIcOwBBR6dPmD4AHRJm/YQ5dgCCjk6fMH0AOiTM+glz7AAEHZ0+HdMHAAAAQH9jmD4AAAAA+h+YPgAAABASYPoAAABASIDpAwAAACEBpg8AAACEBJg+AAAAEBJg+gAAAEBIgOkDAAAAIQGmDwAAAIQEmD4AAAAQEmD6AAAAQEiA6QMAAAAhAaYPAAAAhITfUv8CDwAAAAD6E8z0AQAAgJAA0wcAAABCAkwfAAAACAkwfQAAACAkwPQBAACAkADTBwAAAEICTB8AANYp/27b79K//Y9b6N/sfJj+zS7QAN8XuT9yn9R7F1Zg+gAAsM749xsfMM1eNTmwLHK/5L6p9zJs/G/2XOrAOPQHfgAAAABJRU5ErkJggg==>