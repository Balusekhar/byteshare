import React from "react";
import {XCircle} from "lucide-react";

export function FilePreviewList({ files, onRemoveFile }: { files: File[]; onRemoveFile: (file: File) => void }) {
    return (
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
                        onClick={() => onRemoveFile(file)}
                        className="text-purple-300 hover:text-red-500"
                    >
                        <XCircle className="h-5 w-5" />
                    </button>
                </div>
            ))}
        </div>
    );
}