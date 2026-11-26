// Where the site is hosted.
//
// GitHub Pages serves this repo at https://priyankshah01.github.io/artistic-gurus/,
// so every path needs the /artistic-gurus prefix there. The deploy workflow sets
// NEXT_PUBLIC_BASE_PATH; locally it is empty and the site runs at /.

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.shahpriyank.com";

// Prefix a file in /public with the base path, e.g. asset("/images/Me.jpg").
// next/image and plain <a href> don't add basePath on their own.
export const asset = (path: string) => `${basePath}${path}`;
