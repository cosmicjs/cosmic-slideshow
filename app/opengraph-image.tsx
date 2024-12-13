/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { getSettings } from "@/lib/cosmic";

export default async function Image() {
  const settings = await getSettings();
  return new ImageResponse(
    (
      <img
        src={`${settings.metadata.og_image.imgix_url}?w=1200`}
        alt={settings.metadata.title}
      />
    )
  );
}
