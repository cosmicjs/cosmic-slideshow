/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

export default async function Image() {
  return new ImageResponse(
    (
      <img
        src="https://imgix.cosmicjs.com/afdaeb50-b8c6-11ef-bee4-3bb1d3c55332-cosmic-year-2024.png?w=1200"
        alt="Cosmic 2024 Year End Wrap Up"
      />
    )
  );
}
