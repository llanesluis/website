"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
export default function NotFound() {
  const router = useRouter();

  return (
    <main className="container-padding-x section-padding-y container">
      <div className="flex flex-col gap-6">
        <h1 className="heading trail-highlight">Not Found</h1>
        <p className="text-muted-foreground text-balance">
          The page you are looking for does not exist.
        </p>

        <div className="flex gap-4">
          <Button onClick={() => router.back()}>
            <ArrowLeftIcon className="size-4" /> Go back
          </Button>

          <Button variant="secondary" asChild>
            <Link href="/">Go to home page</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
