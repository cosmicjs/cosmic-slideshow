# Cosmic Slideshow Template

![Cosmic 2024 Year In Review](https://imgix.cosmicjs.com/b6528c00-b8b1-11ef-bee4-3bb1d3c55332-onboarding.png?w=1200)

[View the demo](https://year-end-wrap-up-2024.vercel.app/)

## Getting started
1. Create a new project in the [Cosmic dashboard](https://app.cosmicjs.com/login).
2. In your project, go to the Settings > Import / Export area.
3. Download and install the [Bucket JSON file](https://github.com/cosmicjs/cosmic-slideshow/blob/main/bucket.json) to install the slideshow content model and demo content.
<img width="1416" alt="CleanShot 2024-12-18 at 12 16 41@2x" src="https://github.com/user-attachments/assets/4d77b9ec-977f-48d6-9a4c-257734e7f76d" />


## Download and run locally
Download this code:
```bash
git clone https://github.com/cosmicjs/cosmic-slideshow
cd cosmic-slideshow
```
Copy the `.example.env` file to `.env`:
```bash
mv .example.env .env
```

Add your API keys found in the Cosmic dashboard located in Project > API keys.
```bash
COSMIC_BUCKET_SLUG=your_bucket_slug
COSMIC_READ_KEY=your_bucket_read_key
```
Install packages
```bash
npm i
# or
pnpm i
# or
yarn i
# or
bun i
```
Run locally
```bash
npm run dev
# or
pnpm run dev
# or
yarn dev
# or
bun dev
```

