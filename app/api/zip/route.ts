import JSZip from "jszip";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { files } = await req.json();
  console.log("body received from API", files);

  const zip = new JSZip();

  try {
    // Fetch and add each file to the zip
    for (const file of files) {
      const response = await fetch(file.url);
      console.log("response from fetching file url",response)
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${file.fileName}`);
      }
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();
      zip.file(file.fileName, arrayBuffer);
    }

    // Generate the zip file as a blob
    const zipContent = await zip.generateAsync({ type: "nodebuffer" });

    // Create a response with the zip content
    return new NextResponse(zipContent, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename=files.zip`,
      },
    });
  } catch (error) {
    console.error('Error zipping files:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to create zip file' }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}