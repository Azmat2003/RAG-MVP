import { useRef, useState } from "react";

function FileUpload({ onUpload, loading = false }) {
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");

    // Validate PDF
    if (
      file.type !== "application/pdf" ||
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Please select a valid PDF file.");
      e.target.value = "";
      return;
    }

    try {
      await onUpload(file);
    } catch (err) {
      setError(err.message || "Failed to upload PDF.");
    } finally {
      // Allow selecting the same file again
      e.target.value = "";
    }
  };

  return (
    <div className="w-full">
      {/* Upload Area */}
      <div className="rounded-2xl border border-dashed border-violet-400/30 bg-violet-500/5 p-6 text-center transition hover:border-violet-400/50">

        {/* Upload Icon */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 16V4" />
            <path d="m7 9 5-5 5 5" />
            <path d="M20 16v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3" />
          </svg>
        </div>

        <h3 className="text-sm font-semibold text-slate-200">
          Upload your PDF
        </h3>

        <p className="mt-2 text-xs text-slate-400">
          Add documents to your knowledge base
        </p>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          disabled={loading}
          className="hidden"
        />

        {/* Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Processing...
            </>
          ) : (
            "Choose PDF"
          )}
        </button>

        <p className="mt-3 text-xs text-slate-500">
          PDF files only
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <p role="alert" className="mt-3 text-center text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default FileUpload;