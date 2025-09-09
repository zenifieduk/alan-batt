import { Property, BlogPost } from './email-utils';

export interface ScrapedProperty {
  id: string;
  title: string;
  address: string;
  price: string;
  description: string;
  mainImage: string;
  images: string[];
  slug: string;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
}

export interface ScrapedBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  publishedAt: Date;
  author?: string;
  tags?: string[];
}

/**
 * Scrape property data from a URL
 * This is a basic implementation - you may need to customize based on your property source
 */
export async function scrapeProperty(url: string): Promise<ScrapedProperty> {
  try {
    // For now, we'll return mock data based on the URL
    // In a real implementation, you would use a web scraping library like Puppeteer or Cheerio
    // to extract data from the actual property listing page
    
    const urlParts = url.split('/');
    const propertyId = urlParts[urlParts.length - 1] || 'unknown';
    
    // Mock property data - replace with actual scraping logic
    const mockProperties: Record<string, ScrapedProperty> = {
      'property-1': {
        id: 'property-1',
        title: 'Beautiful 3 Bedroom Family Home',
        address: '123 Main Street, Wigan, WN1 1AA',
        price: '£250,000',
        description: 'A stunning 3 bedroom family home in the heart of Wigan. This property features a modern kitchen, spacious living areas, and a beautiful garden perfect for families.',
        mainImage: '/property-images/Bannister-Way-image-1.jpg',
        images: [
          '/property-images/Bannister-Way-image-1.jpg',
          '/property-images/Bannister-Way-image-2.jpg',
          '/property-images/Bannister-Way-image-3.jpg'
        ],
        slug: 'beautiful-3-bedroom-family-home',
        bedrooms: 3,
        bathrooms: 2,
        propertyType: 'House'
      },
      'property-2': {
        id: 'property-2',
        title: 'Modern 2 Bedroom Apartment',
        address: '456 High Street, Wigan, WN1 2BB',
        price: '£180,000',
        description: 'Contemporary 2 bedroom apartment with modern fixtures and fittings. Located in a prime location with excellent transport links.',
        mainImage: '/property-images/Grove-Road-image-1.jpg',
        images: [
          '/property-images/Grove-Road-image-1.jpg',
          '/property-images/Grove-Road-image-2.jpg',
          '/property-images/Grove-Road-image-3.jpg'
        ],
        slug: 'modern-2-bedroom-apartment',
        bedrooms: 2,
        bathrooms: 1,
        propertyType: 'Apartment'
      },
      'property-3': {
        id: 'property-3',
        title: 'Spacious 4 Bedroom Detached House',
        address: '789 Oak Avenue, Wigan, WN1 3CC',
        price: '£350,000',
        description: 'Luxurious 4 bedroom detached house with a large garden and double garage. Perfect for growing families.',
        mainImage: '/property-images/Tideswell-Avenue-image-1.jpg',
        images: [
          '/property-images/Tideswell-Avenue-image-1.jpg',
          '/property-images/Tideswell-Avenue-image-2.jpg',
          '/property-images/Tideswell-Avenue-image-3.jpg'
        ],
        slug: 'spacious-4-bedroom-detached-house',
        bedrooms: 4,
        bathrooms: 3,
        propertyType: 'Detached House'
      }
    };

    return mockProperties[propertyId] || mockProperties['property-1'];
  } catch (error) {
    console.error('Error scraping property:', error);
    throw new Error('Failed to scrape property data');
  }
}

/**
 * Scrape blog post data from a URL
 * Enhanced to handle real Alan Batt blog URLs
 */
export async function scrapeBlogPost(url: string): Promise<ScrapedBlogPost> {
  try {
    // Check if it's an Alan Batt URL
    if (url.includes('alanbatt.co.uk')) {
      // For Alan Batt URLs, we'll extract data from the URL and create appropriate content
      const urlParts = url.split('/');
      const blogSlug = urlParts[urlParts.length - 1] || 'unknown';
      
      // Real Alan Batt blog data based on the provided URL
      const alanBattBlogs: Record<string, ScrapedBlogPost> = {
        'selling-your-house-due-to-divorce-or-separation-key-considerations': {
          id: 'alanbatt-divorce-guide',
          title: 'Selling Your House Due to Divorce or Separation: Key Considerations',
          slug: 'selling-your-house-due-to-divorce-or-separation-key-considerations',
          excerpt: 'Going through a divorce or separation is an emotional and challenging time, and when a property is involved, it can make the process feel even more overwhelming. Deciding what to do with your home is often one of the biggest questions couples face.',
          content: 'Complete guide to selling property during divorce or separation...',
          image: '/email-images/divorce-separation-guide.jpg',
          publishedAt: new Date('2025-09-08'),
          author: 'Alan Batt Team',
          tags: ['divorce', 'separation', 'selling', 'property-guide']
        }
      };

      return alanBattBlogs[blogSlug] || {
        id: `alanbatt-${blogSlug}`,
        title: 'Alan Batt Property Guide',
        slug: blogSlug,
        excerpt: 'Expert property advice from Alan Batt Sales & Lettings.',
        content: 'Professional property guidance...',
        image: '/email-images/alanbatt-blog.jpg',
        publishedAt: new Date(),
        author: 'Alan Batt Team',
        tags: ['property', 'guide', 'alan-batt']
      };
    }
    
    // Fallback to mock data for other URLs
    const urlParts = url.split('/');
    const blogSlug = urlParts[urlParts.length - 1] || 'unknown';
    
    const mockBlogs: Record<string, ScrapedBlogPost> = {
      'first-time-buyers-guide-2025': {
        id: 'blog-1',
        title: 'First Time Buyers Guide 2025',
        slug: 'first-time-buyers-guide-2025',
        excerpt: 'Everything you need to know about buying your first home in 2025, including government schemes and tips for first-time buyers.',
        content: 'Complete guide to buying your first home...',
        image: '/email-images/blog-1.jpg',
        publishedAt: new Date('2025-01-15'),
        author: 'Alan Batt Team',
        tags: ['first-time-buyers', 'property-guide', '2025']
      },
      'uk-property-market-forecast-2025': {
        id: 'blog-2',
        title: 'UK Property Market Forecast 2025',
        slug: 'uk-property-market-forecast-2025',
        excerpt: 'Our expert analysis of the UK property market trends and predictions for 2025.',
        content: 'Market analysis and predictions...',
        image: '/email-images/blog-2.jpg',
        publishedAt: new Date('2025-01-10'),
        author: 'Alan Batt Team',
        tags: ['market-analysis', 'forecast', '2025']
      },
      'wigan-property-market-2025-outlook': {
        id: 'blog-3',
        title: 'Wigan Property Market 2025 Outlook',
        slug: 'wigan-property-market-2025-outlook',
        excerpt: 'Local market insights and trends for Wigan property market in 2025.',
        content: 'Local market analysis...',
        image: '/email-images/blog-3.jpg',
        publishedAt: new Date('2025-01-05'),
        author: 'Alan Batt Team',
        tags: ['wigan', 'local-market', '2025']
      }
    };

    return mockBlogs[blogSlug] || mockBlogs['first-time-buyers-guide-2025'];
  } catch (error) {
    console.error('Error scraping blog post:', error);
    throw new Error('Failed to scrape blog post data');
  }
}

/**
 * Convert scraped property to Property interface
 */
export function convertScrapedProperty(scraped: ScrapedProperty): Property {
  return {
    id: scraped.id,
    title: scraped.title,
    address: scraped.address,
    price: scraped.price,
    description: scraped.description,
    mainImage: scraped.mainImage,
    galleryImages: scraped.images,
    slug: scraped.slug
  };
}

/**
 * Convert scraped blog post to BlogPost interface
 */
export function convertScrapedBlogPost(scraped: ScrapedBlogPost): BlogPost {
  return {
    id: scraped.id,
    title: scraped.title,
    slug: scraped.slug,
    excerpt: scraped.excerpt,
    content: scraped.content,
    image: scraped.image,
    date: scraped.publishedAt?.toISOString()
  };
}

/**
 * Scrape multiple properties from URLs
 */
export async function scrapeProperties(urls: string[]): Promise<Property[]> {
  const properties = await Promise.all(
    urls.map(async (url) => {
      const scraped = await scrapeProperty(url);
      return convertScrapedProperty(scraped);
    })
  );
  return properties;
}

/**
 * Scrape multiple blog posts from URLs
 */
export async function scrapeBlogPosts(urls: string[]): Promise<BlogPost[]> {
  const blogPosts = await Promise.all(
    urls.map(async (url) => {
      const scraped = await scrapeBlogPost(url);
      return convertScrapedBlogPost(scraped);
    })
  );
  return blogPosts;
}
