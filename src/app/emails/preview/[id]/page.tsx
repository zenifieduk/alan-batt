import { notFound } from 'next/navigation';
import PropertyNewsletterEmail from '@/components/emails/PropertyNewsletterEmail';
import { fetchProperties, fetchBlogPosts } from '@/lib/email-utils';

interface EmailPreviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function EmailPreviewPage({ params }: EmailPreviewPageProps) {
  const { id } = await params;

  // Fetch data for the email
  const properties = await fetchProperties();
  const blogPosts = await fetchBlogPosts();

  // Generate email content based on the ID
  let emailContent;
  
  switch (id) {
    case 'newsletter':
      emailContent = (
        <PropertyNewsletterEmail
          properties={properties}
          blogPosts={blogPosts}
          subject="Wigan Property Market Update - August 2025"
          previewText="Discover the latest properties and market insights from Alan Batt Estate Agents"
          companyName="Alan Batt Estate Agents"
          companyLogo="/logo.png"
          companyAddress="78 Market Street, Wigan, WN1 1HX"
          companyPhone="01942 233 999"
          companyEmail="info@alanbatt.co.uk"
        />
      );
      break;
    
    case 'property-alert':
      emailContent = (
        <PropertyNewsletterEmail
          properties={properties.slice(0, 2)}
          blogPosts={blogPosts.slice(0, 1)}
          subject="New Properties Just Listed - Don't Miss Out!"
          previewText="Exclusive first look at newly listed properties in Wigan"
          companyName="Alan Batt Estate Agents"
          companyLogo="/logo.png"
          companyAddress="78 Market Street, Wigan, WN1 1HX"
          companyPhone="01942 233 999"
          companyEmail="info@alanbatt.co.uk"
        />
      );
      break;
    
    case 'market-update':
      emailContent = (
        <PropertyNewsletterEmail
          properties={properties.slice(0, 1)}
          blogPosts={blogPosts}
          subject="Wigan Property Market Insights - July 2025"
          previewText="Your monthly update on the Wigan property market trends and opportunities"
          companyName="Alan Batt Estate Agents"
          companyLogo="/logo.png"
          companyAddress="78 Market Street, Wigan, WN1 1HX"
          companyPhone="01942 233 999"
          companyEmail="info@alanbatt.co.uk"
        />
      );
      break;
    
    default:
      notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Email Preview: {id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </h1>
          <p className="text-gray-600">
            This is how your email will appear to recipients. Use this preview to review the layout, content, and design.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={`/emails`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Email Builder
            </a>
            <button
              onClick={() => window.print()}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Print Preview
            </button>
          </div>
        </div>

        {/* Email Preview */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {emailContent}
        </div>

        {/* Preview Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Email Details</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><strong>Template:</strong> Property Newsletter</li>
                <li><strong>Properties:</strong> {properties.length} featured</li>
                <li><strong>Blog Posts:</strong> {blogPosts.length} included</li>
                <li><strong>Preview ID:</strong> {id}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Testing Notes</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Check all images load correctly</li>
                <li>• Verify links point to correct URLs</li>
                <li>• Test responsive design on mobile</li>
                <li>• Review content for accuracy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
