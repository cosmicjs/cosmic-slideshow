import { createBucketClient } from "@cosmicjs/sdk";

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
});

export default cosmic;

export const getSettings = async (): Promise<{
  metadata: {
    title: string;
    description: string;
    og_image: { imgix_url: string };
  };
}> => {
  const { object: settings } = await cosmic.objects
    .findOne({
      type: "settings",
      slug: "settings",
    })
    .props(`metadata`);
  return settings;
};
