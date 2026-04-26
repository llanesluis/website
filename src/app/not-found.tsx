"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="container container-padding-x section-padding-y">
      <div className="flex flex-col gap-6">
        <h1 className="trail-highlight heading">Not Found</h1>
        <p className="text-balance text-muted-foreground">
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
