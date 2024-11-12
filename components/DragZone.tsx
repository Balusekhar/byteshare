"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FilePlus, XCircle } from "lucide-react"; // Icons
import { Button } from "./ui/button";

function DragZone() {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (file: File) => {
    setFiles(files.filter((f) => f !== file));
  };

  const handleSend = () => {
    // Implement your file sending logic here
    console.log("Sending files:", files);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className="w-full max-w-sm h-[450px] flex flex-col items-center justify-center p-6 rounded-xl shadow-lg
        bg-gradient-to-br from-[#3F01A7] to-purple-700
        relative overflow-hidden"
      >
        <div
          {...getRootProps()}
          className={`h-full w-full flex flex-col justify-center items-center p-8 border-2 border-dashed rounded-lg
          transition-colors duration-300 bg-opacity-10 backdrop-blur-lg ${
            isDragActive
              ? "border-purple-400 bg-[#1a1a1a]"
              : "border-purple-600 bg-[#292b2f]"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <>
              <FilePlus className="text-purple-400 h-12 w-12 mb-4" />
              <p className="text-purple-400 font-semibold text-lg">
                Drop the files here...
              </p>
            </>
          ) : (
            <>
              <UploadCloud className="text-purple-300 h-12 w-12 mb-4" />
              <p className="text-purple-300 font-semibold text-lg">
                Drag & drop files here, or click to select files
              </p>
            </>
          )}
        </div>

        {files.length > 0 && (
          <div className="w-full h-40 overflow-auto mt-4 p-4 bg-[#292b2f] rounded-lg shadow-inner">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex justify-between items-center p-2 border-b border-purple-600"
              >
                <div>
                  <p className="text-purple-300">{file.name}</p>
                  <p className="text-purple-300 text-sm">
                    {(file.size / 1024).toFixed(2)} KB · {file.type}
                  </p>
                </div>
                <button
                  onClick={() => removeFile(file)}
                  className="text-purple-300 hover:text-red-500"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
        {files.length > 0 && (
          <Button
            onClick={handleSend}
            disabled={files.length === 0}
            className={`mt-4 p-2 w-full rounded-lg ${
              files.length === 0
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-purple-500 hover:bg-purple-600"
            } text-white font-semibold`}
          >
            Send
          </Button>
        )}
      </div>
    </div>
  );
}

export default DragZone;
