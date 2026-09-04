# SKYELAX - Montessori ERP & Learning Management System (LMS)

A modern, scalable, role-based Montessori ERP and Learning Management System designed to streamline school operations, track child developmental progression, generate AI-driven insights, and maintain performance under low-connectivity environments using an offline-first caching layer.

---

## Live Demo & Assessment Details

* **Live Deployment URL:** `https://skyelax-montessori-lms-rho.vercel.app`
* **GitHub Repository:** `https://github.com/MahnoorKhushbakht/skyelax-montessori-lms.git`
* **Assessment Marking Target:** 250 Marks (UI/UX, Database, Core Features, AI & Offline-First, Unique Innovations, Documentation)

---

## Key Features

### 1. Multi-Tenant Role-Based Access Control (RBAC)
* Single-database multi-tenant architecture scoped by `schoolId` to ensure complete data isolation across school campuses.
* Custom middleware and cookie-based authentication supporting three distinct roles:
  * **Admin:** Campus management and global oversight.
  * **Teacher:** Classroom management, attendance logging, observation tracking, and AI feedback generation.
  * **Parent:** Student progress feed, multi-child switching, offline observation reading, and interactive AI developmental assistance.

### 2. Montessori Curriculum & Progress Tracking
* **Developmental Zone Mapping:** Structured logging under core Montessori learning areas: *Practical Life*, *Sensorial*, *Language*, *Mathematics*, and *Culture & Science*.
* **Real-time Observation Feed:** Dynamic teacher observation logs served directly to linked parent accounts.

### 3. Generative AI Insights Engine
* **Observation Synthesis:** Converts brief teacher observation notes into formal, pedagogical Montessori developmental reports using Google Gemini API (`gemini-2.5-flash`).
* **Parent Developmental Analytics:** Auto-generates structured summaries, core strengths, and recommended home activities based on student activity logs.

### 4. Context-Aware AI Assistant Widget (`<AIAssistant/>`)
* Embedded floating assistant available across parent and teacher interfaces.
* Provides real-time guidance on Montessori principles, lesson planning, and child progression.

### 5. Offline-First Resilience
* Client-side caching mechanism (`localStorage`) for student profiles, observation logs, and AI insights.
* Native network status detection (`navigator.onLine`) rendering cached data seamlessly during connectivity drops accompanied by an **Offline Mode Warning Banner**.

---

## Tech Stack

* **Framework:** Next.js 14+ (App Router, Server Actions, API Routes)
* **Language:** JavaScript (ES6+)
* **Styling & UI Components:** Tailwind CSS, Lucide React Icons
* **Database & ORM:** MongoDB, Prisma ORM
* **AI Framework:** Google Gen AI SDK (`@google/genai`)
* **Deployment:** Vercel (Frontend & Serverless API Routes), MongoDB Atlas (Cloud Database)

---

## Database Architecture (Prisma Schema Overview)

```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  ADMIN
  TEACHER
  PARENT
}

enum Category {
  PRACTICAL_LIFE
  SENSORIAL
  LANGUAGE
  MATHEMATICS
  CULTURE
}

model School {
  id        String    @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  code      String    @unique
  users     User[]
  students  Student[]
  createdAt DateTime  @default(now())
}

model User {
  id        String    @id @default(auto()) @map("_id") @db.ObjectId
  email     String    @unique
  password  String
  name      String
  role      Role
  schoolId  String    @db.ObjectId
  school    School    @relation(fields: [schoolId], references: [id])
  students  Student[] @relation("ParentStudents")
  createdAt DateTime  @default(now())
}

model Student {
  id           String        @id @default(auto()) @map("_id") @db.ObjectId
  name         String
  schoolId     String        @db.ObjectId
  school       School        @relation(fields: [schoolId], references: [id])
  parentId     String?       @db.ObjectId
  parent       User?         @relation("ParentStudents", fields: [parentId], references: [id])
  attendances  Attendance[]
  observations Observation[]
}

model Attendance {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  studentId String   @db.ObjectId
  student   Student  @relation(fields: [studentId], references: [id])
  date      DateTime @default(now())
  status    String
}

model Observation {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  studentId String   @db.ObjectId
  student   Student  @relation(fields: [studentId], references: [id])
  category  Category
  note      String
  aiInsight String?
  createdAt DateTime @default(now())
}