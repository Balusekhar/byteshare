import FileDownloadCard from "@/components/FileDownloadCard";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

type Params = Promise<{ folderId: string }>;

async function Page({ params }: { params: Params }) {
  const { folderId } = await params; // Await the params directly

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/upload?folderId=${folderId}`, {
      method: 'GET',
      cache: 'force-cache',
      headers: {    
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch files');
    }

    const data = await response.json();

    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "absolute inset-0",
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          )}
        />
        <div className="z-10 text-center">
          <h1 className="text-5xl font-bold text-black dark:text-white mb-2">Your Shared Files</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
            Download all files with a single click
          </p>
          <FileDownloadCard files={data.presignedUrls} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching files:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">Error loading files</p>
          <p className="text-gray-700">Please try again later or contact support.</p>
        </div>
      </div>
    );
  }
}

export default Page;