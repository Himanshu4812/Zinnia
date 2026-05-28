export interface AbloomProject {
  name: string;
  tagline: string;
  heroDescription: string;
  overview: {
    title: string;
    subtitle: string;
    paragraphs: string[];
  };
  highlights: {
    title: string;
    items: { label: string; value: string }[];
  };
  unitInfrastructure: {
    title: string;
    description: string;
    brandBlurb: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    images: GalleryImage[];
  };
  plans: {
    title: string;
    subtitle: string;
    mainPlanImage: string;
    note: string;
  };
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export interface ContactInfo {
  phone: string;
  addressLines: string[];
  email: string;
}

export interface CompanyInfo {
  aboutUs: {
    title: string;
    description: string;
  };
  companyInfo: {
    title: string;
    links: { label: string; href: string }[];
  };
  social: {
    title: string;
    platforms: string[];
  };
  copyright: string;
}
