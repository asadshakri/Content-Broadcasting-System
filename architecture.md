# 🏗️ Architecture Notes – Content Broadcasting System

A clean, production-oriented design covering authentication, RBAC, uploads, approvals, scheduling/rotation, and data modeling.

---

## 🔐 1) Authentication & RBAC Flow

**Auth Mechanism:** JWT (JSON Web Token)

### 🧭 Flow

1. **Register** (name, email, password, role)
2. **Password Hashing** using `bcrypt`
3. **Login** → verify credentials
4. **Issue JWT**

   ```json
   {
     "userId": "<id>"
   }
   ```
5. **Protected Routes** require header:

   ```http
   Authorization: Bearer <token>
   ```
6. **Middleware**

   * `authenticate` → verifies token, attaches `req.user`
   * `role` → enforces permissions

### 🧑‍🤝‍🧑 Roles & Permissions

**Teacher**

* Upload content
* View own content
* View approved content
* Schedule approved content

**Principal**

* View all content
* View pending content
* Approve / Reject content

**Public (Students)**

* No login required
* Access only public/live APIs

---

## 📚 2) Subject-Based System Design

Each content belongs to a **subject** (e.g., Maths, Science, English).

* Each subject has a **Slot (Queue)**
* Independent rotation per subject

**Examples**

* Maths Slot → A → B → C
* Science Slot → X → Y

---

## 📤 3) Upload Handling Approach

**Content Type:** `multipart/form-data`

### 🧾 Fields

* `title` *(required)*
* `subject` *(required)*
* `description` *(optional)*
* `file` *(required)*
* `start_time`, `end_time`

### ⚙️ Pipeline

1. Parse via **multer**
2. Validate

   * Types: `jpg`, `png`, `gif`
   * Size: ≤ **10 MB**
3. Store in **memory buffer**
4. Upload to **AWS S3**
5. Persist **public URL** in DB

---

## ✅ 4) Approval Workflow Design

**Lifecycle**

```
uploaded → pending → approved | rejected
```

* On upload → `status = pending`

### 🧑‍💼 Principal Actions

**Approve**

* `status = approved`
* `approved_by`
* `approved_at`

**Reject**

* `status = rejected`
* `rejection_reason`

> Only **approved** content can be scheduled. Pending/Rejected never appear publicly.

---

## 🔁 5) Scheduling & Rotation Logic

Scheduling occurs **after approval**.

### 🧭 Flow

1. Teacher selects approved content
2. System finds subject **slot**
3. Insert into `ContentSchedule`

### 🧱 Fields

* `content_id`
* `slot_id`
* `rotation_order`
* `duration_minutes`

### 🧮 Rotation Example (Maths)

| Item           | Duration |
| -------------- | -------- |
| Addition       | 5 min    |
| Subtraction    | 5 min    |
| Multiplication | 10 min   |

**Total Duration = 20 min**

```
currentMinute = floor(now_in_minutes) % totalDuration
```

**Range Mapping**

* 0–4   → Item 1
* 5–9   → Item 2
* 10–19 → Item 3

> Loop repeats infinitely.

### 🔍 Additional Filters

* `status === approved`
* `teacherId` matches
* `start_time <= now <= end_time`

If no valid item → return empty.

---

## 🗄️ 6) Database Design

### 👤 Users

```
id, name, email, password, role, created_at
```

**Purpose:** Teachers & Principals

### 📦 Content

```
id, title, description, subject,
file_path, file_type, file_size,
uploaded_by, status, rejection_reason,
approved_by, approved_at,
start_time, end_time, created_at
```

**Purpose:** Content + Approval + Time Window

### 🧩 Slots

```
id, subject, created_at
```

**Purpose:** One queue per subject

### 🔁 ContentSchedule

```
id, content_id, slot_id, rotation_order,
duration_minutes, created_at
```

**Purpose:** Queue order + duration

---

## 🗂️ 7) Folder Structure

```
src/
 ├── controllers/
 │   ├── authController.js
 │   ├── contentController.js
 │   ├── principalController.js
 │   └── publicController.js

 ├── services/
 │   ├── authService.js
 │   └── contentService.js

 ├── models/
 │   ├── user.js
 │   ├── content.js
 │   ├── slot.js
 │   ├── schedule.js
 │   └── index.js

 ├── routes/
 │   ├── authRoutes.js
 │   ├── contentRoutes.js
 │   ├── principalRoutes.js
 │   └── publicRoutes.js

 ├── middleware/
 │   ├── authenticate.js
 │   ├── role.js
 │   ├── upload.js
 │   └── rateLimit.js

 ├── utils/
 │   ├── s3.js
 │   └── db-connection.js

 └── app.js
```

---

## 🧰 8) Middleware Usage

### 🔐 authenticate.js

* Verifies JWT
* Attaches `req.user`

### 🛂 role.js

* Restricts access by role

```
role("teacher")
role("principal")
```

### 📤 upload.js

* Multer parsing
* File type & size validation

### 🚦 rateLimit.js

* Applied to public APIs
* Prevents abuse/spam

---

## ✨ Key Highlights

* Clean RBAC separation
* Independent subject queues
* Deterministic rotation algorithm
* S3-based scalable media handling
* Middleware-driven security & validation

