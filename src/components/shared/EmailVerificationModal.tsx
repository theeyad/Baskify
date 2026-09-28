"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MailCheck } from "lucide-react";

function EmailVerificationModalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("verified") === "pending") {
      setOpen(true);
    }
  }, [searchParams]);

  function handleClose() {
    setOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("verified");
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    router.replace(newUrl, { scroll: false });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
            <MailCheck className="h-6 w-6" />
          </div>
          <DialogTitle className="text-xl font-bold">Check your email!</DialogTitle>
          <DialogDescription className="text-center pt-2 text-muted-foreground leading-relaxed">
            Thank you for creating an account with Baskify! We have sent a verification email to your address.
            Please confirm your email address to complete your registration and sign in.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-center pt-2">
          <Button onClick={handleClose} className="w-full sm:w-auto px-8 cursor-default">
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function EmailVerificationModal() {
  return (
    <Suspense fallback={null}>
      <EmailVerificationModalContent />
    </Suspense>
  );
}
