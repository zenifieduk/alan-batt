export interface Property {
  id: string;
  title: string;
  address: string;
  price: string;
  description: string;
  mainImage: string;
  galleryImages: string[];
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  image?: string;
  content: string;
  date?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  previewText: string;
  properties: Property[];
  blogPosts: BlogPost[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Fetch properties from your data sources
 * This function should be replaced with actual property data fetching logic
 */
export async function fetchProperties(): Promise<Property[]> {
  // Real property data from Alan Batt
  return [
    {
      id: '1',
      title: 'Grove Road, Upholland, WN8',
      address: 'Grove Road, Upholland, WN8',
      price: '£775,000',
      description: 'Set within approximately 0.5 acres of mature gardens occupying an elevated plot with sweeping lawns and far reaching views across Winter Hill in the heart of the historic village of Upholland, is this fantastic property that stands out from the rest with an impressive double fronted façade making for a dramatic yet charming impression. The property embraces the individual nuances of times gone by but with a keen eye for detail and modern convenience.',
      mainImage: '/property-images/Grove-Road-image-1.jpg',
      galleryImages: [
        '/property-images/Grove-Road-image-2.jpg',
        '/property-images/Grove-Road-image-3.jpg',
        '/property-images/Grove-Road-image-4.jpg'
      ],
      slug: 'grove-road-upholland'
    },
    {
      id: '2',
      title: 'Bannister Way, Winstanley, WN3',
      address: 'Bannister Way, Winstanley, WN3',
      price: '£375,000 In Excess of',
      description: 'Introducing this exceptional five-bedroom detached residence—a harmonious blend of elegance, comfort, and lifestyle convenience. A spacious entrance hall welcomes you, offering access to key ground floor rooms and a separate water closet. The generous living room features bay windows and a charming fireplace, perfect for relaxed evenings or stylish entertaining.',
      mainImage: '/property-images/Bannister-Way-image-1.jpg',
      galleryImages: [
        '/property-images/Bannister-Way-image-2.jpg',
        '/property-images/Bannister-Way-image-3.jpg',
        '/property-images/Bannister-Way-image-4.jpg'
      ],
      slug: 'bannister-way-winstanley'
    },
    {
      id: '3',
      title: 'Tideswell Avenue, Orrell, WN5',
      address: 'Tideswell Avenue, Orrell, WN5',
      price: '£450,000 Offers in Region of',
      description: 'This exquisite 6-bedroom detached house offers a perfect blend of modern design and everyday functionality. Located in the sought-after area of Orrell, this property provides exceptional family living space with contemporary finishes throughout.',
      mainImage: '/property-images/Tideswell-Avenue-image-1.jpg',
      galleryImages: [
        '/property-images/Tideswell-Avenue-image-2.jpg',
        '/property-images/Tideswell-Avenue-image-3.jpg',
        '/property-images/Tideswell-Avenue-image-4.jpg'
      ],
      slug: 'tideswell-avenue-orrell'
    }
  ];
}

/**
 * Fetch blog posts from your data sources
 * This is a placeholder - replace with your actual blog data fetching logic
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  // TODO: Replace with actual blog data fetching
  // This could come from your database, CMS, or external API
  
  return [
    {
      id: 'august-2025-property-market-forecast',
      title: 'August 2025 Property Market Forecast',
      excerpt: 'Get the latest insights into the Wigan property market for August 2025. Discover trends, opportunities, and expert predictions.',
      slug: 'august-2025-property-market-forecast',
      content: 'Full blog post content...',
      image: '/images/blog/august-2025-property-market-forecast.jpg',
      date: '2025-08-01'
    },
    {
      id: 'wigan-property-market-2025-outlook',
      title: 'Wigan Property Market 2025 Outlook',
      excerpt: 'Comprehensive analysis of the Wigan property market outlook for 2025. What to expect and how to prepare.',
      slug: 'wigan-property-market-2025-outlook',
      content: 'Full blog post content...',
      image: '/images/blog/wigan-property-market-2025-outlook.jpg',
      date: '2025-01-01'
    },
    {
      id: 'july-2025-property-market-summer-insights',
      title: 'July 2025 Property Market Summer Insights',
      excerpt: 'Summer insights into the Wigan property market. Seasonal trends and what buyers and sellers should know.',
      slug: 'july-2025-property-market-summer-insights',
      content: 'Full blog post content...',
      image: '/images/blog/july-2025-property-market-summer-insights.jpg',
      date: '2025-07-01'
    }
  ];
}

/**
 * Create a new email template
 */
export function createEmailTemplate(
  name: string,
  subject: string,
  previewText: string,
  properties: Property[],
  blogPosts: BlogPost[]
): EmailTemplate {
  return {
    id: Date.now().toString(),
    name,
    subject,
    previewText,
    properties,
    blogPosts,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

/**
 * Validate email template data
 */
export function validateEmailTemplate(template: Partial<EmailTemplate>): string[] {
  const errors: string[] = [];
  
  if (!template.name?.trim()) {
    errors.push('Template name is required');
  }
  
  if (!template.subject?.trim()) {
    errors.push('Subject line is required');
  }
  
  if (!template.properties?.length) {
    errors.push('At least one property must be selected');
  }
  
  if (!template.blogPosts?.length) {
    errors.push('At least one blog post must be selected');
  }
  
  return errors;
}

/**
 * Generate email preview data for testing
 */
export function generatePreviewData(): { properties: Property[]; blogPosts: BlogPost[] } {
  // Return empty data for preview - will be populated with real data when needed
  return {
    properties: [],
    blogPosts: []
  };
}
