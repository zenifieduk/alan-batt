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
 * This is a placeholder - replace with your actual property data fetching logic
 */
export async function fetchProperties(): Promise<Property[]> {
  // TODO: Replace with actual property data fetching
  // This could come from your database, CMS, or external API
  
  return [
    {
      id: '1',
      title: 'Modern Family Home',
      address: 'Rylance Road, Winstanley, WN3',
      price: '£400,000',
      description: 'A stunning 4-bedroom detached family home with modern amenities, spacious garden, and excellent location near local schools and amenities. Features include a modern kitchen, conservatory, utility room, and four generous bedrooms.',
      mainImage: '/images/properties/rylance-road-main.jpg',
      galleryImages: [
        '/images/properties/rylance-road-1.jpg',
        '/images/properties/rylance-road-2.jpg',
        '/images/properties/rylance-road-3.jpg'
      ],
      slug: 'rylance-road-winstanley'
    },
    {
      id: '2',
      title: 'Town Centre Apartment',
      address: 'Weston Park, Standish Lower Ground, WN6',
      price: '£250,000',
      description: 'Beautiful 2-bedroom apartment in the heart of Standish with modern kitchen, parking, and excellent transport links. Perfect for professionals or small families.',
      mainImage: '/images/properties/weston-park-main.jpg',
      galleryImages: [
        '/images/properties/weston-park-1.jpg',
        '/images/properties/weston-park-2.jpg'
      ],
      slug: 'weston-park-standish'
    },
    {
      id: '3',
      title: 'Family Semi-Detached',
      address: 'Bannister Way, Wigan, WN3',
      price: '£320,000',
      description: 'Spacious 3-bedroom semi-detached house with large garden, garage, and excellent family-friendly location. Recently updated with modern fixtures.',
      mainImage: '/images/properties/bannister-way-main.jpg',
      galleryImages: [
        '/images/properties/bannister-way-1.jpg',
        '/images/properties/bannister-way-2.jpg',
        '/images/properties/bannister-way-3.jpg'
      ],
      slug: 'bannister-way-wigan'
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
  return {
    properties: [
      {
        id: 'preview-1',
        title: 'Preview Property',
        address: '123 Example Street, Wigan, WN1',
        price: '£350,000',
        description: 'This is a preview property for testing email templates. It includes all the necessary fields to demonstrate the email layout.',
        mainImage: 'https://via.placeholder.com/400x250/1e3a8a/ffffff?text=Property+Image',
        galleryImages: [
          'https://via.placeholder.com/80x80/6b7280/ffffff?text=1',
          'https://via.placeholder.com/80x80/6b7280/ffffff?text=2',
          'https://via.placeholder.com/80x80/6b7280/ffffff?text=3'
        ],
        slug: 'preview-property'
      }
    ],
    blogPosts: [
      {
        id: 'preview-blog',
        title: 'Preview Blog Post',
        excerpt: 'This is a preview blog post for testing email templates. It demonstrates how blog content will appear in the newsletter.',
        slug: 'preview-blog-post',
        content: 'Preview content...',
        image: 'https://via.placeholder.com/300x150/0d9488/ffffff?text=Blog+Image'
      }
    ]
  };
}
