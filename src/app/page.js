"use client";

import { useState, useCallback } from "react";
import {
  Upload,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Users,
  DollarSign,
} from "lucide-react";

export default function ROITracker() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [progressStage, setProgressStage] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);

  const handleFileUpload = useCallback(async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError(null);
    setIsUploading(true);
    setProgressStage("Uploading document...");
    setProgressPercent(0);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Estimate processing time based on file size
      const fileSizeKB = selectedFile.size / 1024;
      const estimatedTimeSeconds = Math.max(8, Math.min(30, fileSizeKB / 50)); // 8-30 seconds

      // Progress simulation with realistic stages
      const progressStages = [
        { stage: "Uploading document...", percent: 10, delay: 500 },
        { stage: "Reading document content...", percent: 25, delay: 1000 },
        { stage: "Analyzing with AI...", percent: 45, delay: 2000 },
        {
          stage: "Extracting ROI indicators...",
          percent: 70,
          delay: estimatedTimeSeconds * 1000 * 0.4,
        },
        {
          stage: "Generating recommendations...",
          percent: 90,
          delay: estimatedTimeSeconds * 1000 * 0.3,
        },
      ];

      // Start progress updates
      let currentStageIndex = 0;
      const updateProgress = () => {
        if (currentStageIndex < progressStages.length) {
          const currentStage = progressStages[currentStageIndex];
          setProgressStage(currentStage.stage);
          setProgressPercent(currentStage.percent);

          setTimeout(() => {
            currentStageIndex++;
            updateProgress();
          }, currentStage.delay);
        }
      };
      updateProgress();

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze document");
      }

      setProgressStage("Finalizing results...");
      setProgressPercent(95);

      const result = await response.json();

      setProgressPercent(100);
      setTimeout(() => {
        setAnalysis(result);
      }, 300); // Brief pause to show 100% completion
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
      setProgressStage("");
      setProgressPercent(0);
    }
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      const droppedFile = event.dataTransfer.files[0];
      if (droppedFile) {
        const fakeEvent = { target: { files: [droppedFile] } };
        handleFileUpload(fakeEvent);
      }
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ROI Tracker Agent
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your project documents to get AI-powered leading and lagging
            ROI indicators, along with actionable recommendations for project
            success.
          </p>
        </div>

        {/* Upload Area */}
        <div className="mb-8">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById("file-upload").click()}
          >
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              {file ? file.name : "Click to upload or drag and drop"}
            </p>
            <p className="text-sm text-gray-500">
              PDF, DOC, DOCX, or TXT files up to 10MB
            </p>
          </div>
        </div>

        {/* Loading State with Progress */}
        {isUploading && (
          <div className="text-center py-8">
            <div className="max-w-md mx-auto">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg mb-4">
                <Clock className="animate-spin h-4 w-4 mr-2" />
                {progressStage || "Analyzing document..."}
              </div>

              {/* Progress bar */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>

                {/* Stage indicators */}
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span
                    className={
                      progressPercent >= 10 ? "text-blue-600 font-medium" : ""
                    }
                  >
                    Upload
                  </span>
                  <span
                    className={
                      progressPercent >= 25 ? "text-blue-600 font-medium" : ""
                    }
                  >
                    Read
                  </span>
                  <span
                    className={
                      progressPercent >= 45 ? "text-blue-600 font-medium" : ""
                    }
                  >
                    Analyze
                  </span>
                  <span
                    className={
                      progressPercent >= 70 ? "text-blue-600 font-medium" : ""
                    }
                  >
                    Extract
                  </span>
                  <span
                    className={
                      progressPercent >= 90 ? "text-blue-600 font-medium" : ""
                    }
                  >
                    Generate
                  </span>
                  <span
                    className={
                      progressPercent >= 100 ? "text-green-600 font-medium" : ""
                    }
                  >
                    Complete
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-3">
                  {file && `Processing ${file.name} • `}
                  Estimated time:{" "}
                  {Math.max(8, Math.min(30, (file?.size || 0) / 1024 / 50))}s
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-8">
            {/* Leading Indicators */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
                Leading Indicators
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysis.leadingIndicators?.map((indicator, index) => (
                  <div
                    key={index}
                    className="bg-green-50 border border-green-200 rounded-lg p-4"
                  >
                    <h3 className="font-medium text-green-900 mb-2">
                      {indicator.name}
                    </h3>
                    <p className="text-sm text-green-700">
                      {indicator.description}
                    </p>
                    <div className="mt-2">
                      <span className="text-xs font-medium text-green-600">
                        Score: {indicator.score}/10
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lagging Indicators */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <DollarSign className="h-6 w-6 text-blue-600 mr-2" />
                Lagging Indicators
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysis.laggingIndicators?.map((indicator, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                  >
                    <h3 className="font-medium text-blue-900 mb-2">
                      {indicator.name}
                    </h3>
                    <p className="text-sm text-blue-700">
                      {indicator.description}
                    </p>
                    <div className="mt-2">
                      <span className="text-xs font-medium text-blue-600">
                        Expected Impact: {indicator.impact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="h-6 w-6 text-purple-600 mr-2" />
                Recommendations & Next Steps
              </h2>
              <div className="space-y-4">
                {analysis.recommendations?.map((rec, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {rec.title}
                      </h3>
                      <p className="text-gray-700">{rec.description}</p>
                      {rec.priority && (
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${
                            rec.priority === "High"
                              ? "bg-red-100 text-red-800"
                              : rec.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {rec.priority} Priority
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Summary */}
            {analysis.summary && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="h-6 w-6 text-gray-600 mr-2" />
                  Project Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {analysis.summary}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Upload New Document Button */}
        {analysis && (
          <div className="text-center mt-8">
            <button
              onClick={() => {
                setAnalysis(null);
                setFile(null);
                setError(null);
                setProgressStage("");
                setProgressPercent(0);
                document.getElementById("file-upload").value = "";
              }}
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Another Document
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
