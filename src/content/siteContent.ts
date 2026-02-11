
export interface ServiceItem {
  name: string;
  price: string;
  duration?: string;
  description?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description?: string;
  note?: string;
  items: ServiceItem[];
}

export interface ImageItem {
  src: string;
  alt: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  description?: string;
  before: ImageItem;
  after: ImageItem;
}

export interface Policy {
  title: string;
  content: string;
}

export interface PolicyPageContent {
  intro: string;
  items: Policy[];
  outroTitle: string;
  outroText: string;
  agreementText: string;
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

export interface SiteContent {
  brandName: string;
  contact: {
    email: string;
    instagram: string;
    address: string;
  };
  navLinks: { label: string; href: string }[];
  footerLinks: { label: string; href: string }[];
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  services: ServiceCategory[];
  gallery: CaseStudy[];
  policies: PolicyPageContent;
  testimonials: Testimonial[];
}

export const siteContent: SiteContent = {
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME || "LKSTUDIOUK",
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@lkstudiouk.com",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "@lkstudio_uk",
    address: process.env.NEXT_PUBLIC_ADDRESS || "Salford, Greater Manchester",
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Book", href: "/book" },
  ],
  footerLinks: [
    { label: "Contact", href: "/contact" },
    { label: "Policies", href: "/policies" },
  ],
  hero: {
    title: "Enhancing Your Natural Beauty",
    subtitle: "Tagline TBC",
    cta: "Book Now",
  },
  services: [
    {
      id: "brows",
      title: "Brows",
      items: [
        {
          name: "Brow Lamination and Tint",
          price: "£25",
          description: "A treatment that smooths and sets brows to create a fuller, lifted and more defined brow shape, whilst tint adds colour and definition. Includes brow mapping and waxing for a clean finish."
        },
        {
          name: "Brow and Tint",
          price: "£15",
          description: "Shaping and defining the brows with wax whilst tint enhances colour and fullness. Includes brow mapping."
        },
        {
          name: "Brow Lamination and Wax",
          price: "£20",
          description: "Sets brows into a lifted, fuller and more defined brow shape without adding colour. Is ideal for a more natural look. Includes brow mapping and waxing."
        },
        {
          name: "Brow Touch Up",
          price: "£15",
          description: "A maintenance appointment for existing clients to tidy regrowth, refine shape and refresh brows between full treatments."
        },
        {
          name: "Brow Wax Only",
          price: "£10",
          description: "Shaping and clean-up of the brows using waxing and brow mapping."
        },
        {
          name: "Halal Brows",
          price: "£25",
          description: "Uses Halal-friendly brow stain for defined, filled-in brows. Includes bleaching around the brow area for a polished look. This service does not remove hairs. Brow lamination and mapping included."
        }
      ],
    },
    {
      id: "makeup",
      title: "Makeup Services",
      note: "Note: Lashes are included with every appointment; however, clients are welcome to provide their own if preferred.",
      items: [
        {
          name: "Natural Glam",
          price: "£15",
          description: "A minimal and simplistic makeup look aimed to enhance your gorgeous natural features. Smooth, glowing skin like base with soft contour and natural lashes. No eyeshadow for an effortless natural finish."
        },
        {
          name: "Softglam",
          price: "£20",
          description: "Soft Glam is all about enhancing your natural beauty with a luxe touch, flawless skin, soft contouring, a subtle glow and minimal yet refined eyeshadow."
        },
        {
          name: "Full Glam",
          price: "£25",
          description: "A full coverage look with bolder eyeshadow, defined contour and a polished finish. Perfect for any occasion where you want a more dramatic glam."
        }
      ],
    },
  ],
  gallery: [
    {
      id: "case1",
      title: "Natural Glam Transformation",
      before: { src: "/gallery/case1-before.jpg", alt: "Before Natural Glam" },
      after: { src: "/gallery/case1-after.jpg", alt: "After Natural Glam" }
    },
    {
      id: "case2",
      title: "Brow Lamination",
      before: { src: "/gallery/case2-before.jpg", alt: "Before Brow Lamination" },
      after: { src: "/gallery/case2-after.jpg", alt: "After Brow Lamination" }
    },
    {
      id: "case3",
      title: "Soft Glam Look",
      before: { src: "/gallery/case3-before.jpg", alt: "Before Soft Glam" },
      after: { src: "/gallery/case3-after.jpg", alt: "After Soft Glam" }
    },
  ],
  policies: {
    intro: "To give you the best experience possible, we kindly ask that you read and follow our policies before securing your appointment. These guidelines help us provide a smooth, respectful and high-quality service to every client.",
    items: [
      {
        title: "Deposits",
        content: "A £10 non-refundable deposit is required to secure your appointment. This will go towards your final payment. Your booking will not be confirmed until this deposit is received."
      },
      {
        title: "Running Late?",
        content: "We offer a 15-minute grace period if you're running late. After this time, your appointment will automatically be cancelled. Please always contact us as soon as possible if you're delayed. Communication makes all the difference!"
      },
      {
        title: "Rescheduling",
        content: "Need to reschedule? No problem, as long as you do so at least 48 hours before your appointment."
      },
      {
        title: "No Shows",
        content: "If you do not attend your appointment without notice, you will be banned from booking future appointments with us. We deeply value your time and ask for the same in return."
      },
      {
        title: "During Your Appointment",
        content: "We understand the pull of your phone, but please minimise phone usage during your appointment. Constant head tilting or looking down can disrupt the process and affect your final look. Your cooperation helps us give you the best possible glam."
      },
      {
        title: "Mobile Bookings",
        content: "We offer mobile services for your convenience. However, these appointments incur an additional fee to cover transport. Please contact us for further information."
      },
      {
        title: "No Extra Guests",
        content: "Please do not bring any plus-ones unless you've both booked appointments together. This helps us maintain a calm, focused and professional environment."
      },
      {
        title: "Prep For Your Appointment",
        content: "To get the best results, here's how to prepare:\n- Arrive with a clean, fresh, makeup-free face\n- Groomed eyebrows are recommended as they enhance the final look\n- Please notify us of any allergies or product sensitivities at the time of booking so we can prepare accordingly\n- As we are currently perfecting our craft, we kindly ask that you bring your foundation shade with you. If you're unsure of your shade or need help choosing one, please contact us before booking, we're happy to help!"
      }
    ],
    outroTitle: "Thank You For Choosing LKSTUDIOUK",
    outroText: "We truly appreciate your understanding and cooperation. These policies are in place to give every client the attention, time and service they deserve. We can't wait to create a look you'll love, thank you for choosing us!",
    agreementText: "By choosing to book with us, you are agreeing to all of the above policies"
  },
  testimonials: [
    {
      name: "Yaz",
      text: "Loving my brows right now! The service was professional and the results are amazing, like xx",
      rating: 5,
    },
    {
      name: "Lisur",
      text: "Best lash lift I've ever had. Highly recommend!",
      rating: 5,
    },
  ],
};
