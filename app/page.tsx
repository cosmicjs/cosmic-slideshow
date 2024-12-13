import Link from "next/link";
import Slideshow from "@/components/Slideshow";
import cosmic from "@/lib/cosmic";
import ThemeToggle from "@/components/ThemeToggle";
import { HomeIcon } from "lucide-react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ slide?: string }>;
}) {
  const { slide } = await searchParams;

  const { objects } = await cosmic.objects
    .find({
      type: "webinar-slides",
    })
    .props(["slug", "title", "metadata"])
    .depth(1)
    .sort("-order");

  const initialSlide = slide
    ? Math.min(Math.max(parseInt(slide) - 1, 0), objects.length - 1)
    : 0;

  return (
    <main className="h-screen w-screen overflow-hidden pb-16 bg-gray-100 dark:bg-gray-900 transition-colors">
      <Link
        href="/"
        className="fixed top-4 left-4 z-10 p-2 bg-transparent"
        aria-label="Go to home page"
      >
        <HomeIcon size={24} className="text-gray-900 dark:text-white" />
      </Link>
      <ThemeToggle />
      <Slideshow slides={objects} initialSlide={initialSlide} />
    </main>
  );
}
