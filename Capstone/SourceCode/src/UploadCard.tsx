import { Upload, FileSpreadsheet, X, Link as LinkIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UploadCardProps {
  onAnalyze?: () => void;
}

export default function UploadCard({ onAnalyze }: UploadCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [datasetLink, setDatasetLink] = useState("");
  const [preview, setPreview] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);
    setFileSize((file.size / 1024).toFixed(1) + " KB");
    setDatasetLink("");
    setShowPreview(true);

    // Basic CSV preview
    if (file.name.toLowerCase().endsWith(".csv")) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target?.result as string;

        const rows = text
          .split(/\r?\n/)
          .filter((row) => row.trim() !== "")
          .slice(0, 11)
          .map((row) => row.split(","));

        if (rows.length > 0) {
          setHeaders(rows[0]);
          setPreview(rows.slice(1));
        }
      };

      reader.readAsText(file);
    } else {
      // Placeholder preview for Excel files for now
      setHeaders(["Excel dataset selected"]);
      setPreview([]);
    }
  };

  const removeFile = () => {
    setFileName("");
    setFileSize("");
    setPreview([]);
    setHeaders([]);
    setShowPreview(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyze = () => {
    if (!fileName && !datasetLink.trim()) {
      alert("Please upload a dataset or paste a dataset link.");
      return;
    }

    if (onAnalyze) {
      onAnalyze();
    }
	localStorage.setItem(
  "datasetName",
  fileName || datasetLink.trim()
);

    navigate("/analysis");
  };

  return (
    <div className="w-full max-w-[850px]">
      {/* Upload / Link input */}
      <div
        className="
          relative flex min-h-[80px] w-full items-center
          rounded-[32px]
          border-2 border-white/80
          bg-white/[0.12]
          px-5
          shadow-[0_6px_24px_rgba(0,0,0,0.06)]
          backdrop-blur-[20px]
        "
      >
        <button
          type="button"
          aria-label="Upload dataset"
          onClick={() => fileInputRef.current?.click()}
          className="
            mr-4 flex h-11 w-11 shrink-0
            items-center justify-center
            rounded-full bg-black text-white
            transition-all hover:scale-105 hover:bg-[#333]
            active:scale-95
          "
        >
          <Upload className="h-5 w-5" />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          className="hidden"
        />

        {fileName ? (
          <div className="min-w-0 flex-1 text-left">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 shrink-0 text-[#5f87dc]" />
              <span className="truncate font-medium text-[#1a1a1a]">
                {fileName}
              </span>
            </div>
            <p className="mt-1 text-sm text-[#767676]">
              {fileSize} · Dataset ready for preview
            </p>
          </div>
        ) : (
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <LinkIcon className="h-5 w-5 shrink-0 text-[#5f87dc]" />

            <input
              type="text"
              value={datasetLink}
              onChange={(e) => setDatasetLink(e.target.value)}
              placeholder="Paste a dataset link or upload a file..."
              className="
                w-full bg-transparent
                font-sans text-lg font-medium
                text-[#1a1a1a]
                outline-none
                placeholder:text-[#5f87dc]/65
              "
            />
          </div>
        )}

        {fileName && (
          <button
            onClick={removeFile}
            className="
              mr-3 flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-full text-[#767676]
              hover:bg-black/5 hover:text-black
            "
            aria-label="Remove dataset"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <button
          onClick={handleAnalyze}
          className="
            ml-3 flex h-11 w-[136px] shrink-0
            items-center justify-center
            rounded-full
            bg-black
            font-sans text-[14px] font-medium
            uppercase tracking-[0.02em]
            text-[#fafafa]
            transition-all
            hover:bg-[#333]
            active:scale-95
          "
        >
          Analyze
        </button>
      </div>

      {/* Dataset Preview */}
      {showPreview && (
        <div
          className="
            mt-5 overflow-hidden rounded-[28px]
            border border-white/80
            bg-white/[0.35]
            text-left
            shadow-[0_6px_24px_rgba(0,0,0,0.05)]
            backdrop-blur-[20px]
          "
        >
          <div className="flex items-center justify-between border-b border-black/5 px-6 py-4">
            <div>
              <h3 className="font-semibold text-[#1a1a1a]">
                Dataset Preview
              </h3>
              <p className="mt-1 text-sm text-[#767676]">
                First rows of {fileName}
              </p>
            </div>

            <span className="rounded-full bg-[#5f87dc]/10 px-3 py-1 text-sm font-medium text-[#5f87dc]">
              Preview
            </span>
          </div>

          <div className="max-h-[320px] overflow-auto">
            {preview.length > 0 ? (
              <table className="min-w-full border-collapse text-sm">
                <thead className="sticky top-0 bg-white/80 backdrop-blur">
                  <tr>
                    {headers.map((header, index) => (
                      <th
                        key={index}
                        className="whitespace-nowrap border-b border-black/10 px-5 py-3 text-left font-semibold text-[#1a1a1a]"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {preview.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="border-b border-black/5 last:border-none"
                    >
                      {headers.map((_, colIndex) => (
                        <td
                          key={colIndex}
                          className="whitespace-nowrap px-5 py-3 text-[#5f5f5f]"
                        >
                          {row[colIndex] ?? ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="px-6 py-8 text-center text-sm text-[#767676]">
                Excel file selected. Preview can be enabled when we connect
                Excel parsing.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}