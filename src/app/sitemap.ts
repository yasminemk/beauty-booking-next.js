import type { MetadataRoute } from "next";
import { siteContent } from "@/config/siteContent";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteContent.siteUrl.replace(/\/$/, "");
  const routes = ["/", "/services", "/gallery", "/book", "/policies", "/contact"];

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
  }));
}
