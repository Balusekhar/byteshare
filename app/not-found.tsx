import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import linkImage from "@/public/16.png"

export default function Component() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="flex flex-col items-center pt-6">
          <div className="relative w-64 h-64 mb-8">
            <Image
              src={linkImage}
              alt="404 Error Scarecrow"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter">Page not found</h1>
            <p className="text-muted-foreground">
              The link you pasted might have expired or it doesn't exist
            </p>
            <Button asChild className="mt-4">
              <Link href="/">Go back home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}