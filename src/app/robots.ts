import type { MetadataRoute } from "next";
import { siteContent } from "@/content/siteContent";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteContent.siteUrl.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

