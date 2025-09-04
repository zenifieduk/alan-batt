# Email Newsletter Setup Guide

This guide explains how to set up and use the email newsletter functionality for Alan Batt Sales & Lettings.

## Prerequisites

1. **Resend Account**: Sign up at [resend.com](https://resend.com)
2. **Domain Verification**: Verify your domain (alanbatt.co.uk) with Resend
3. **API Key**: Generate an API key from your Resend dashboard

## Environment Setup

Create a `.env.local` file in your project root with the following variables:

```bash
# Resend API Configuration
RESEND_API_KEY=your_resend_api_key_here

# Base URL for your application
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Email Configuration
FROM_EMAIL=newsletter@alanbatt.co.uk
REPLY_TO_EMAIL=sales@alanbatt.co.uk
```

## Domain Configuration

1. **Add DNS Records**: Add the required DNS records to your domain provider:
   - SPF record: `v=spf1 include:_spf.resend.com ~all`
   - DKIM record: Provided by Resend
   - DMARC record: `v=DMARC1; p=quarantine; rua=mailto:dmarc@alanbatt.co.uk`

2. **Verify Domain**: Complete domain verification in your Resend dashboard

## Features

### Email Templates
- **PropertyNewsletterEmail**: Professional newsletter template matching your brand
- Responsive design that works on all devices
- Includes property listings, blog posts, and call-to-action sections

### Email Composition Interface
- Select properties and blog posts to include
- Add multiple recipients
- Preview emails before sending
- Customizable subject lines and preview text

### API Endpoints
- `POST /api/email`: Send emails
- `GET /api/email`: Preview emails (for testing)

## Usage

### 1. Access Email Interface
Navigate to `/emails` in your application to access the email composition interface.

### 2. Compose Newsletter
1. **Email Details**: Enter subject line and preview text
2. **Recipients**: Add email addresses (supports multiple recipients)
3. **Properties**: Select properties to feature in the newsletter
4. **Blog Posts**: Choose blog posts to include
5. **Preview**: Test the email layout before sending
6. **Send**: Deliver the newsletter to your recipients

### 3. Customization
- Modify the email template in `src/components/emails/PropertyNewsletterEmail.tsx`
- Update styles and layout to match your brand
- Add new sections or modify existing ones

## Data Integration

### Properties
The system currently uses mock data. To integrate with your actual property data:

1. Update `fetchProperties()` in `src/lib/email-utils.ts`
2. Connect to your property database or CMS
3. Ensure properties have the required fields (id, title, address, price, description, images, slug)

### Blog Posts
Blog posts are automatically fetched from your markdown files in `public/articles/`. To customize:

1. Update `fetchBlogPosts()` in `src/lib/email-utils.ts`
2. Ensure your markdown files have proper frontmatter
3. Add images for blog posts in `public/images/blog/`

## Testing

### Preview Mode
Use the preview functionality to test email layouts before sending:
1. Select properties and blog posts
2. Click "Preview Email"
3. Review the rendered HTML in a new tab

### Test Sends
1. Use test email addresses during development
2. Verify email delivery and formatting
3. Test on different email clients and devices

## Troubleshooting

### Common Issues

1. **API Key Errors**
   - Verify your Resend API key is correct
   - Ensure the key has proper permissions

2. **Domain Verification Issues**
   - Check DNS records are properly configured
   - Wait for DNS propagation (can take up to 48 hours)

3. **Email Delivery Problems**
   - Check spam/junk folders
   - Verify sender domain is properly configured
   - Review Resend delivery logs

### Debug Mode
Enable debug logging by adding to your environment:
```bash
DEBUG=resend:*
```

## Security Considerations

1. **Rate Limiting**: Implement rate limiting for email sending
2. **Input Validation**: Validate all email inputs
3. **Authentication**: Ensure only authorized users can send emails
4. **Unsubscribe**: Include proper unsubscribe mechanisms

## Cost Considerations

- Resend pricing: $20/month for 50,000 emails
- Additional emails: $0.80 per 1,000
- Monitor usage in your Resend dashboard

## Support

- **Resend Documentation**: [docs.resend.com](https://docs.resend.com)
- **React Email**: [react.email](https://react.email)
- **Project Issues**: Create issues in your project repository

## Next Steps

1. **Customize Templates**: Modify email templates to match your exact brand requirements
2. **Add Analytics**: Integrate email tracking and analytics
3. **Automation**: Set up automated email campaigns
4. **Segmentation**: Implement recipient segmentation based on interests
5. **A/B Testing**: Test different email formats and content
