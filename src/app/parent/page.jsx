"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import ChildHeader from "../../../components/ChildHeader";
import ObservationCard from "../../../components/ObservationCard";
import AIAssistant from "../../../components/AiInsights";
import { setCachedData, getCachedData } from "../../../lib/offlineCache";
import { Calendar, Sparkles, WifiOff } from "lucide-react";

export default function ParentDashboard() {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [observations, setObservations] = useState([]);
  const [aiInsights, setAiInsights] = useState(null);
  const [loading, setLoading] = useState({ students: true, observations: false, ai: false });
  const [error, setError] = useState("");
  const [usingCampusFallback, setUsingCampusFallback] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

 
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Fetch Linked Children / Campus Fallback
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        if (!navigator.onLine) {
          const cachedStudents = getCachedData("parent_students");
          if (cachedStudents) setStudents(cachedStudents);
          return;
        }

        const savedId = localStorage.getItem("selectedStudentId");
        const parentId = document.cookie
          .split("; ")
          .find((cookie) => cookie.startsWith("parentId="))
          ?.split("=")[1];

        const linkedResponse = await fetch(
          parentId ? `/api/students?parentId=${encodeURIComponent(parentId)}` : "/api/students?parentId="
        );
        const linkedData = await linkedResponse.json();

        if (!linkedResponse.ok) {
          throw new Error(linkedData.error || "Unable to load students.");
        }

        let list = Array.isArray(linkedData.students) ? linkedData.students : [];
        let fallback = false;

        if (list.length === 0) {
          const campusResponse = await fetch("/api/students");
          const campusData = await campusResponse.json();

          if (!campusResponse.ok) {
            throw new Error(campusData.error || "Unable to load campus students.");
          }

          list = Array.isArray(campusData.students) ? campusData.students : [];
          fallback = true;
        }

        const childId = list.some((student) => student.id === savedId)
          ? savedId
          : list[0]?.id || "";

        setStudents(list);
        setCachedData("parent_students", list);
        setUsingCampusFallback(fallback);
        setSelectedStudentId(childId);
        if (childId) {
          localStorage.setItem("selectedStudentId", childId);
        }
      } catch (err) {
        console.error("Error fetching parent children:", err);
        setError(err.message || "Unable to load students.");
        const cachedStudents = getCachedData("parent_students");
        if (cachedStudents) setStudents(cachedStudents);
      } finally {
        setLoading((prev) => ({ ...prev, students: false }));
      }
    };

    fetchChildren();
  }, []);


  useEffect(() => {
    if (!selectedStudentId) return;

    const fetchObservationsAndInsights = async () => {
      try {
        setLoading((prev) => ({ ...prev, observations: true, ai: true }));
        setError("");


        if (!navigator.onLine) {
          const cachedObs = getCachedData(`obs_${selectedStudentId}`);
          const cachedAi = getCachedData(`ai_${selectedStudentId}`);
          if (cachedObs) setObservations(cachedObs);
          if (cachedAi) setAiInsights(cachedAi);
          return;
        }

  
        const response = await fetch(
          `/api/observations?studentId=${encodeURIComponent(selectedStudentId)}${
            usingCampusFallback ? "&allowCampusFallback=true" : ""
          }`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to load observations.");
        }

        const obsList = Array.isArray(data.observations) ? data.observations : [];
        setObservations(obsList);
        setCachedData(`obs_${selectedStudentId}`, obsList);


        const aiResponse = await fetch("/api/ai/insights", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId: selectedStudentId }),
        });
        const aiData = await aiResponse.json();

        if (aiResponse.ok && aiData.insights) {
          setAiInsights(aiData.insights);
          setCachedData(`ai_${selectedStudentId}`, aiData.insights);
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setError(err.message || "Unable to load observations.");
        const cachedObs = getCachedData(`obs_${selectedStudentId}`);
        const cachedAi = getCachedData(`ai_${selectedStudentId}`);
        if (cachedObs) setObservations(cachedObs);
        if (cachedAi) setAiInsights(cachedAi);
      } finally {
        setLoading((prev) => ({ ...prev, observations: false, ai: false }));
      }
    };

    fetchObservationsAndInsights();
  }, [selectedStudentId, usingCampusFallback]);

  const selectedStudent = students.find((s) => s.id === selectedStudentId) || students[0] || null;
  const handleStudentSelect = (studentId) => {
    setSelectedStudentId(studentId);
    localStorage.setItem("selectedStudentId", studentId);
  };

  return (
    <DashboardLayout role="PARENT">
      <div className="max-w-4xl mx-auto space-y-6 relative">

        {isOffline && (
          <div className="rounded-xl border border-amber-300/40 bg-amber-950/80 p-3.5 text-xs text-amber-200 flex items-center gap-2 shadow-sm">
            <WifiOff className="w-4 h-4 text-amber-400" />
            <span>Offline Mode Enabled: Rendering locally cached student observations & insights.</span>
          </div>
        )}


        <ChildHeader
          student={selectedStudent}
          students={students}
          selectedId={selectedStudentId}
          onSelect={handleStudentSelect}
        />

        {usingCampusFallback && (
          <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
            No linked child found for this account. Showing campus students.
          </p>
        )}

  
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 border-b border-slate-800 pb-3">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-sm">AI Developmental Insights</h3>
          </div>

          {loading.ai ? (
            <p className="text-xs text-slate-400 animate-pulse py-2">Analyzing student observations...</p>
          ) : aiInsights ? (
            <div className="space-y-2 text-xs text-slate-300">
              <p className="leading-relaxed">{aiInsights.developmentalSummary}</p>
              {aiInsights.coreStrengths?.length > 0 && (
                <p>
                  <strong className="text-emerald-400">Core Strengths:</strong> {aiInsights.coreStrengths.join(", ")}
                </p>
              )}
              {aiInsights.suggestedActivities?.length > 0 && (
                <p>
                  <strong className="text-emerald-400">Recommended Home Activities:</strong> {aiInsights.suggestedActivities.join(", ")}
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-1">No AI analytics available for this child yet.</p>
          )}
        </div>


        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-base">Developmental Activity Feed</h3>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Recent Updates
            </span>
          </div>

          {loading.students && <p className="text-xs text-slate-500">Loading student details...</p>}
          {loading.observations && <p className="text-xs text-slate-500">Loading activity feed...</p>}
          {error && <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">{error}</p>}

          {!loading.students && !loading.observations && !error && observations.length === 0 && (
            <p className="text-xs text-slate-500 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              No observations recorded yet for this child.
            </p>
          )}

          <div className="space-y-4">
            {observations.map((item) => (
              <ObservationCard key={item.id} item={item} />
            ))}
          </div>
        </div>


        <AIAssistant userRole="PARENT" studentContext={selectedStudent} />
      </div>
    </DashboardLayout>
  );
}