"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { File, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import NotFound from "@/app/not-found";

interface FileDownloadCardProps {
  files: { url: string; fileName: string }[];
}

export default function FileDownloadCard({ files }: FileDownloadCardProps) {
  const [downloadStatus, setDownloadStatus] = useState(false);
  if (!files) {
    return <NotFound />;
  }

  async function handleDownload() {
    try {
      setDownloadStatus(true);
      const response = await axios.post(
        "/api/zip",
        {
          files: files.map((file) => ({
            url: file.url,
            fileName: file.fileName,
          })),
        },
        {
          responseType: "blob", // Ensure the response is treated as a binary Blob
        }
      );

      if (response.status === 200) {
        // Create a Blob from the response data
        const blob = new Blob([response.data], { type: "application/zip" });

        // Create a download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "files.zip"); // Set the filename

        // Append the link, trigger click and remove the link
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url); // Clean up the URL object

        setDownloadStatus(false);
        toast.success("Files downloaded successfully.");
      } else {
        toast.error("Failed to download files.");
      }
    } catch (error) {
      setDownloadStatus(false);
      console.error("Download error:", error);
      toast.error("An error occurred while downloading the files.");
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Download Shared Files
        </CardTitle>
        <CardDescription>
          {files.length} file(s) available for download
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.fileName} className="flex items-center space-x-4">
              <div className="bg-gray-200 p-3 rounded-full">
                <File className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <h3 className="font-semibold">{file.fileName}</h3>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleDownload} className="w-full">
          {downloadStatus ? (
            <span className="flex items-center justify-center">
              Downloading..
              <LoaderCircle className="animate-spin ms-2" />
            </span>
          ) : (
            <span>Download All Files</span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
