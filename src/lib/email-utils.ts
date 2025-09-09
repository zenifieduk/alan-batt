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
 * Fetch blog posts from markdown files in the articles directory
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    // List of article files to include in the newsletter
    const articleFiles = [
      'august-2025-property-market-forecast.md',
      'wigan-property-market-2025-outlook.md',
      'july-2025-property-market-summer-insights.md',
      'first-time-buyers-guide-2025.md',
      'uk-property-market-forecast-2025.md'
    ];

    const blogPosts: BlogPost[] = [];

    for (const filename of articleFiles) {
      try {
        const response = await fetch(`/articles/${filename}`);
        if (!response.ok) continue;
        
        const content = await response.text();
        const lines = content.split('\n');
        
        // Extract title from first line (remove # prefix)
        const title = lines[0].replace(/^#\s*/, '').trim();
        
        // Extract published date and reading time from second line
        const publishedLine = lines.find(line => line.includes('Published:'));
        const readTimeLine = lines.find(line => line.includes('Reading time:'));
        const categoryLine = lines.find(line => line.includes('Category:'));
        
        // Extract published date
        const publishedDate = publishedLine?.match(/Published:\s*([^|]+)/)?.[1]?.trim() || 'Unknown';
        
        // Generate excerpt from first few paragraphs (first 200 characters)
        const contentStart = lines.findIndex(line => line.trim() === '---') + 1;
        const excerptStart = contentStart + 1;
        const excerptLines = lines.slice(excerptStart, excerptStart + 10);
        const excerptText = excerptLines.join(' ').replace(/#{1,6}\s*/g, '').trim();
        const excerpt = excerptText.length > 200 ? excerptText.substring(0, 200) + '...' : excerptText;
        
        // Generate slug from filename
        const slug = filename.replace('.md', '');
        
        // Try to find a featured image in the content or use a default
        let featuredImage = '/images/blog/care-fees-property.jpg'; // Default image
        
        // Look for image references in the content
        const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
        if (imageMatch && imageMatch[1]) {
          featuredImage = imageMatch[1];
        }
        
        // Look for specific blog images
        const blogImageMatch = content.match(/\/images\/blog\/([^)]+)/);
        if (blogImageMatch && blogImageMatch[1]) {
          featuredImage = `/images/blog/${blogImageMatch[1]}`;
        }
        
        // Assign specific images based on article content
        if (slug.includes('property-market') || slug.includes('forecast')) {
          featuredImage = '/images/blog/care-fees-property.jpg';
        } else if (slug.includes('first-time') || slug.includes('buyers')) {
          featuredImage = '/images/blog/divorce-separation-property.jpg';
        } else if (slug.includes('wigan')) {
          featuredImage = '/images/blog/care-fees-property.jpg';
        }

        blogPosts.push({
          id: slug,
          title,
          excerpt,
          slug,
          content,
          image: featuredImage,
          date: publishedDate
        });
      } catch (error) {
        console.error(`Error processing article ${filename}:`, error);
        continue;
      }
    }

    // Sort by date (most recent first)
    return blogPosts.sort((a, b) => {
      const dateA = new Date(a.date || '');
      const dateB = new Date(b.date || '');
      return dateB.getTime() - dateA.getTime();
    });

  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Return fallback data if there's an error
    return [
      {
        id: 'august-2025-property-market-forecast',
        title: 'August 2025 Property Market Forecast',
        excerpt: 'Get the latest insights into the Wigan property market for August 2025. Discover trends, opportunities, and expert predictions.',
        slug: 'august-2025-property-market-forecast',
        content: 'Full blog post content...',
        image: '/images/blog/august-2025-property-market-forecast.jpg',
        date: '2025-08-01'
      }
    ];
  }
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
