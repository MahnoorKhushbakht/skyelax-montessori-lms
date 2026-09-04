"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import StatCard from "../../../components/StatCard";
import FormCard from "../../../components/FormCard";
import EntityList from "../../../components/EntityList";
import { Building2, Users, GraduationCap, Server, UserRound, BookUser } from "lucide-react";
import Input from "@/components/ui/input";

export default function AdminDashboard() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [teacherForm, setTeacherForm] = useState({ name: "", email: "", password: "", schoolId: "" });
  const [studentForm, setStudentForm] = useState({ name: "", schoolId: "", parentId: "" });

  const [teacherStatus, setTeacherStatus] = useState({ loading: false, error: "", success: "" });
  const [studentStatus, setStudentStatus] = useState({ loading: false, error: "", success: "" });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [usersRes, studentsRes] = await Promise.all([fetch("/api/users"), fetch("/api/students")]);
        const usersData = await usersRes.json();
        const studentsData = await studentsRes.json();

        if (!usersRes.ok || !studentsRes.ok) throw new Error("Failed to fetch dashboard data");

        const userList = Array.isArray(usersData.users) ? usersData.users : [];
        const studentList = Array.isArray(studentsData.students) ? studentsData.students : [];

        setTeachers(userList.filter((u) => u.role === "TEACHER"));
        setStudents(studentList);

        const defaultSchoolId = userList[0]?.schoolId || studentList[0]?.schoolId || "";
        setTeacherForm((prev) => ({ ...prev, schoolId: prev.schoolId || defaultSchoolId }));
        setStudentForm((prev) => ({ ...prev, schoolId: prev.schoolId || defaultSchoolId }));
      } catch (err) {
        setError(err.message || "Unable to load data.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    if (!teacherForm.name || !teacherForm.email || !teacherForm.password || !teacherForm.schoolId) {
      return setTeacherStatus({ loading: false, error: "All fields are required.", success: "" });
    }
    try {
      setTeacherStatus({ loading: true, error: "", success: "" });
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...teacherForm, role: "TEACHER" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add teacher");

      setTeachers((prev) => [data.user, ...prev]);
      setTeacherForm((prev) => ({ ...prev, name: "", email: "", password: "" }));
      setTeacherStatus({ loading: false, error: "", success: "Teacher created successfully." });
    } catch (err) {
      setTeacherStatus({ loading: false, error: err.message, success: "" });
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!studentForm.name || !studentForm.schoolId) {
      return setStudentStatus({ loading: false, error: "Name and School ID are required.", success: "" });
    }
    try {
      setStudentStatus({ loading: true, error: "", success: "" });
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add student");

      setStudents((prev) => [data.student, ...prev]);
      setStudentForm((prev) => ({ ...prev, name: "", parentId: "" }));
      setStudentStatus({ loading: false, error: "", success: "Student created successfully." });
    } catch (err) {
      setStudentStatus({ loading: false, error: err.message, success: "" });
    }
  };

  return (
    <DashboardLayout role="ADMIN">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Admin Management</h2>
          <p className="text-xs text-slate-500">Manage teachers, students, and classroom assignments</p>
        </div>

        {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

  
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard icon={Building2} color="bg-indigo-50 text-indigo-600" title="Active Campus" value="01 (Primary)" />
          <StatCard icon={Users} color="bg-emerald-50 text-emerald-600" title="Teachers" value={loading ? "..." : `${teachers.length} active`} />
          <StatCard icon={GraduationCap} color="bg-blue-50 text-blue-600" title="Students" value={loading ? "..." : `${students.length} enrolled`} />
          <StatCard icon={Server} color="bg-purple-50 text-purple-600" title="DB Status" value="MongoDB Online" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <FormCard
            title="Add Teacher"
            icon={UserRound}
            onSubmit={handleAddTeacher}
            loading={teacherStatus.loading}
            error={teacherStatus.error}
            success={teacherStatus.success}
            buttonText="Add Teacher"
          >
            <Input placeholder="Teacher Name" value={teacherForm.name} onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })} />
            <Input type="email" placeholder="Email" value={teacherForm.email} onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })} />
            <Input type="password" placeholder="Password" value={teacherForm.password} onChange={(e) => setTeacherForm({ ...teacherForm, password: e.target.value })} />
            <Input placeholder="School ID" value={teacherForm.schoolId} onChange={(e) => setTeacherForm({ ...teacherForm, schoolId: e.target.value })} />
          </FormCard>

          <FormCard
            title="Add Student"
            icon={BookUser}
            onSubmit={handleAddStudent}
            loading={studentStatus.loading}
            error={studentStatus.error}
            success={studentStatus.success}
            buttonText="Add Student"
          >
            <Input placeholder="Student Name" value={studentForm.name} onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })} />
            <Input placeholder="School ID" value={studentForm.schoolId} onChange={(e) => setStudentForm({ ...studentForm, schoolId: e.target.value })} />
            <Input placeholder="Parent ID (Optional)" value={studentForm.parentId} onChange={(e) => setStudentForm({ ...studentForm, parentId: e.target.value })} />
          </FormCard>
        </div>


        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <EntityList
            title="Teachers"
            items={teachers}
            loading={loading}
            emptyText="No teachers available."
            renderSubtext={(t) => t.email}
            badgeColor="border-emerald-200 bg-emerald-50 text-emerald-700"
          />
          <EntityList
            title="Students"
            items={students}
            loading={loading}
            emptyText="No students available."
            renderSubtext={(s) => s.school?.name || "School assigned"}
            badgeColor="border-indigo-200 bg-indigo-50 text-indigo-700"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}