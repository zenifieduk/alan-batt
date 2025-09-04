import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import PropertyNewsletterEmail from '@/components/emails/PropertyNewsletterEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      to, 
      subject, 
      properties, 
      blogPosts, 
      from = 'Alan Batt Sales & Lettings <newsletter@alanbatt.co.uk>'
    } = body;

    // Validate required fields
    if (!to || !subject) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject' },
        { status: 400 }
      );
    }

    // Render the email template
    const emailHtml = await render(
      PropertyNewsletterEmail({
        mainProperty: properties?.[0] || null,
        secondaryProperties: properties?.slice(1) || [],
        blogPosts: blogPosts || [],
        companyName: "Alan Batt Estate Agents",
        companyLogo: "/logo.png",
        companyAddress: "78 Market Street, Wigan, WN1 1HX",
        companyPhone: "01942 233 999",
        salesEmail: "sales@alanbatt.co.uk",
        rentalsEmail: "rentals@alanbatt.co.uk"
      }) as React.ReactElement
    );

    // Send the email
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      messageId: data?.id,
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint for testing/preview
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const properties = searchParams.get('properties');
    const blogPosts = searchParams.get('blogPosts');

    // Parse the query parameters
    const parsedProperties = properties ? JSON.parse(decodeURIComponent(properties)) : [];
    const parsedBlogPosts = blogPosts ? JSON.parse(decodeURIComponent(blogPosts)) : [];

    // Render the email template for preview
    const emailHtml = await render(
      PropertyNewsletterEmail({
        mainProperty: parsedProperties?.[0] || null,
        secondaryProperties: parsedProperties?.slice(1) || [],
        blogPosts: parsedBlogPosts,
        companyName: "Alan Batt Estate Agents",
        companyLogo: "/logo.png",
        companyAddress: "78 Market Street, Wigan, WN1 1HX",
        companyPhone: "01942 233 999",
        salesEmail: "sales@alanbatt.co.uk",
        rentalsEmail: "rentals@alanbatt.co.uk"
      }) as React.ReactElement
    );

    return new NextResponse(emailHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    });

  } catch (error) {
    console.error('Preview error:', error);
    return NextResponse.json(
      { error: 'Failed to generate preview' },
      { status: 500 }
    );
  }
}
