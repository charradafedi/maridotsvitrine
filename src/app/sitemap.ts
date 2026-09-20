import type { MetadataRoute } from "next";

const BASE_URL = "https://maridots.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/notice`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
