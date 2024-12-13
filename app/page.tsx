import Link from "next/link";
import Slideshow from "@/components/Slideshow";
import cosmic from "@/lib/cosmic";
import ThemeToggle from "@/components/ThemeToggle";
import { HomeIcon, GithubIcon } from "lucide-react";

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
      <div className="fixed top-0 left-0 right-0 z-10 md:bg-transparent bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-1 px-4 flex justify-between items-center">
        <Link href="/" className="p-2" aria-label="Go to home page">
          <HomeIcon size={24} className="text-gray-900 dark:text-white" />
        </Link>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/cosmicjs/year-end-wrap-up-2024"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="View on GitHub"
          >
            <GithubIcon size={24} />
          </a>
          <ThemeToggle />
        </div>
      </div>
      <Slideshow slides={objects} initialSlide={initialSlide} />
    </main>
  );
}
