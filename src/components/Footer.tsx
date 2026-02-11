import Link from "next/link";
import { siteContent } from "@/content/siteContent";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">{siteContent.brandName}</h3>
            <p className="text-gray-500 text-sm max-w-xs">
              {siteContent.hero.subtitle}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              {siteContent.navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>{siteContent.contact.email}</li>
              <li>Instagram: {siteContent.contact.instagram}</li>
              <li>{siteContent.contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>&copy; {currentYear} {siteContent.brandName}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {siteContent.footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-black transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
