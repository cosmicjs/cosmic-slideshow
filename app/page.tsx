import Link from "next/link";
import Slideshow from "../components/Slideshow";
import cosmic from "../lib/cosmic";

export default async function Home({
  searchParams,
}: {
  searchParams: { slide?: string };
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
    <main className="h-screen w-screen overflow-hidden pt-6 pb-16 bg-gray-900">
      <h1 className="text-white text-center text-4xl font-bold mb-0 pb-6">
        <Link href="/" className="hover:opacity-80">
          Cosmic 2024 Year End Wrap Up 🎉
        </Link>
      </h1>
      <Slideshow slides={objects} initialSlide={initialSlide} />
    </main>
  );
}
