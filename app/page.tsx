import DragZone from "@/components/DragZone";

export default function Home() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-[#1A1A1A] text-[#FAFAFA]"
    >
      <main className="w-full max-w-6xl">
        <div className="container mx-auto px-6 py-16 md:py-24">
          <div className="grid gap-16 md:grid-cols-2 items-center justify-center">
            {/* Left Section */}
            <div className="flex flex-col justify-center">
              <h1
                className="text-4xl text-[#FAFAFA] font-bold bg-[] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Share files instantly with{" "}
                <span className="relative inline-block">
                  ByteShare
                  <svg
                    className="absolute -bottom-10 left-0 w-full"
                    viewBox="0 0 284 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 3L280.663 3C269.449 3 258.349 3.9 247.279 4.764C221.349 6.787 195.529 8.92 169.786 11.556C151.278 13.451 132.755 15.328 114.19 17.061C113.357 17.139 90.773 19.35 90.951 19.635C91.634 20.727 116.442 19.025 118.838 18.968C135.096 18.578 151.406 18.638 167.64 18.014"
                      stroke="#3F01A7" // Change color to purple
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
              <p className="max-w-[600px] text-xl mt-12 text-[#FAFAFA]">
                The fastest way to share your files securely. No signup
                required, just drag and drop.
              </p>
            </div>

            {/* Right Section */}
            <DragZone />
          </div>
        </div>
      </main>
    </div>
  );
}
