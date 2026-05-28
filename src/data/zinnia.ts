import { AbloomProject } from "@/src/lib/types";
import type { GalleryItem } from "@/components/ui/circular-gallery";

export const zinnia: AbloomProject = {
  name: "Zinnia",
  tagline: "A Life Rooted in Green Luxury",
  heroDescription:
    "Our villa communities are thoughtfully designed for those who seek more than just a home — they seek a lifestyle.",
  overview: {
    title: "Zinnia -",
    subtitle: "A Life Rooted in Green Luxury",
    paragraphs: [
      "Nestled in 17 acres of lush greenery, our luxurious Tourist Homes project offers unparalleled tranquility with a breathtaking natural waterfall nearby and excellent connectivity. Enjoy 2 exclusive amenities posts and a lavish 1.5-acre fine-dining restaurant, a premium recreational facilities, redefining luxury living at its finest.",
      "Experience the epitome of luxury living with villas spanning 3,000 sq. ft. and above on expansive 15,000 sq. ft. Farm. Designed for ultimate privacy and uniqueness, each villa offers an exclusive retreat where elegance meets tranquility.",
    ],
  },
  unitInfrastructure: {
    title: "Amenities",
    description:
      "Realty brings to you the Building Revolution. It all started with realistic appraisal of your living needs.",
    brandBlurb: "",
  },
  location: {
    title: "Location",
    subtitle: "Discover Our Prime Location in the Heart of Nature",
    address: "Kachurli, Trimbakeshwar, Nashik, Maharashtra 422212",
    description: "Nestled in the serene foothills of Trimbakeshwar, our luxury villa community offers the perfect blend of tranquility and connectivity. Surrounded by lush greenery and breathtaking natural beauty, yet easily accessible from Nashik city.",
    embedUrl: "https://www.google.com/maps?q=Kachurli+Trimbakeshwar+Nashik+Maharashtra&output=embed",
  },
  gallery: {
    title: "Gallery",
    subtitle: "Project",
    images: [
      {
        id: 1,
        src: "https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-6.jpg",
        alt: "Zinnia 6",
      },
      {
        id: 2,
        src: "https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-5.jpg",
        alt: "Zinnia 5",
      },
      {
        id: 3,
        src: "https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-4.jpg",
        alt: "Zinnia 4",
      },
      {
        id: 4,
        src: "https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-3-scaled.jpg",
        alt: "Zinnia 3",
      },
    ],
  },
  plans: {
    title: "Plans",
    subtitle: "Master Plan",
    mainPlanImage: "https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-map1-1024x618.jpg",
    note: "* Click for larger view",
  },
};

export const galleryItems: GalleryItem[] = [
  {
    common: 'Luxurious Villas',
    binomial: 'Exquisite architecture blending with nature',
    photo: {
      url: 'https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-6.jpg',
      text: 'Luxurious villa exterior with lush greenery',
      pos: '50% 30%',
      by: 'Zinnia',
    },
  },
  {
    common: 'Modern Interiors',
    binomial: 'Expansive luxury and natural light',
    photo: {
      url: 'https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-5.jpg',
      text: 'Modern interior with elegant furnishings',
      pos: '50% 40%',
      by: 'Zinnia',
    },
  },
  {
    common: 'Night View',
    binomial: 'A beautifully illuminated environment',
    photo: {
      url: 'https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-4.jpg',
      text: 'Night view of the illuminated villa property',
      pos: '50% 50%',
      by: 'Zinnia',
    },
  },
  {
    common: 'Fine Dining',
    binomial: 'A lavish 1.5-acre restaurant experience',
    photo: {
      url: 'https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-3-scaled.jpg',
      text: 'Fine dining restaurant interior',
      pos: '50% 40%',
      by: 'Zinnia',
    },
  },
  {
    common: 'Infinity Pool',
    binomial: 'Serene poolside surrounded by nature',
    photo: {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop&q=80',
      text: 'Luxury swimming pool at sunset',
      pos: '50% 40%',
      by: 'R ARCHITECTURE',
    },
  },
  {
    common: 'Grand Entrance',
    binomial: 'Stately entrance with modern elegance',
    photo: {
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&auto=format&fit=crop&q=80',
      text: 'Modern luxury house exterior entrance',
      pos: '50% 40%',
      by: 'Dennis Bree',
    },
  },
  {
    common: 'Lush Gardens',
    binomial: 'Landscaped gardens and green pathways',
    photo: {
      url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=900&auto=format&fit=crop&q=80',
      text: 'Beautiful landscaped garden with pathway',
      pos: '50% 60%',
      by: 'Spacejoy',
    },
  },
  {
    common: 'Wellness Retreat',
    binomial: 'Spa and wellness center for rejuvenation',
    photo: {
      url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&auto=format&fit=crop&q=80',
      text: 'Modern wellness and spa interior',
      pos: '50% 50%',
      by: 'Unsplash',
    },
  },
];
