import {NextRequest, NextResponse} from "next/server";
import {PutObjectCommand, S3Client, S3ClientConfig} from "@aws-sdk/client-s3";
import {v4 as uuidv4} from 'uuid';
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

interface File {
    name: string;
    type: string;
}

const s3ClientConfig: S3ClientConfig = {
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
};

const s3Client = new S3Client(s3ClientConfig);

export async function POST(req: NextRequest) {
    const {files} = await req.json();
    console.log("files", files);
    const folderId = uuidv4();

    try {
        const presignedUrls = await Promise.all(
            files.map(async (file: File) => {
                const myKey = `${folderId}/${file.name}`;
                const command = new PutObjectCommand({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: myKey,
                    ContentType: file.type,
                });
                const signedUrl = await getSignedUrl(s3Client, command, {
                    expiresIn: 3600,
                });

                return {
                    fileName: file.name,
                    signedUrl,
                    folderId
                };
            })
        );
        return NextResponse.json({presignedUrls});

    } catch (error) {
        console.error("Error generating presigned URLs:", error);
        return NextResponse.json(
            {error: "Failed to generate presigned URLs"},
            {status: 500}
        );
    }


}