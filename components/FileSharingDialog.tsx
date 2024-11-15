"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import QRCode from "react-qr-code";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { Facebook, Linkedin, Share2, Twitter } from "lucide-react";

export default function FileSharingDialog({
  isOpen = false,
  onClose = () => {},
  fileUrl,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  fileUrl: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(fileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share File</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" value={fileUrl} readOnly />
            </div>
            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={handleCopy}
            >
              <span className="sr-only">Copy</span>
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <div className="flex justify-center">
            <QRCode value={fileUrl} size={128} />
          </div>
          <div className="text-center text-sm text-red-600">
            Note: This link will expire in 1 day.
          </div>
          <div className="flex justify-center space-x-4">
            <FacebookShareButton url={fileUrl}>
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Share on Facebook</span>
            </FacebookShareButton>
            <TwitterShareButton url={fileUrl}>
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Share on Twitter</span>
            </TwitterShareButton>
            <WhatsappShareButton url={fileUrl}>
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share on WhatsApp</span>
            </WhatsappShareButton>
            <LinkedinShareButton url={fileUrl}>
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">Share on LinkedIn</span>
            </LinkedinShareButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
