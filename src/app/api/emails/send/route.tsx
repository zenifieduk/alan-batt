import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import PropertyNewsletterEmail from '@/components/emails/PropertyNewsletterEmail';
import { fetchProperties, fetchBlogPosts } from '@/lib/email-utils';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      to, 
      subject, 
      templateId = 'newsletter'
    } = body;

    if (!to || !subject) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: to, subject' },
        { status: 400 }
      );
    }

    // Fetch data for the email
    const properties = await fetchProperties();
    const blogPosts = await fetchBlogPosts();

    // Generate email content based on template
    let emailContent;
    const emailSubject = `Hot Properties Newsletter - ${new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`;
    const emailPreviewText = `Check out our latest hot properties for ${new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`;
    
    switch (templateId) {
      case 'newsletter':
        emailContent = (
          <PropertyNewsletterEmail
            mainProperty={properties[0]}
            secondaryProperties={properties.slice(1)}
            blogPosts={blogPosts}
            companyName="Alan Batt Estate Agents"
            companyLogo="/logo.png"
            companyAddress="78 Market Street, Wigan, WN1 1HX"
            companyPhone="01942 233 999"
            salesEmail="sales@alanbatt.co.uk"
            rentalsEmail="rentals@alanbatt.co.uk"
          />
        );
        break;
      
      case 'property-alert':
        emailContent = (
          <PropertyNewsletterEmail
            mainProperty={properties[0]}
            secondaryProperties={properties.slice(1, 2)}
            blogPosts={blogPosts.slice(0, 1)}
            companyName="Alan Batt Estate Agents"
            companyLogo="/logo.png"
            companyAddress="78 Market Street, Wigan, WN1 1HX"
            companyPhone="01942 233 999"
            salesEmail="sales@alanbatt.co.uk"
            rentalsEmail="rentals@alanbatt.co.uk"
          />
        );
        break;
      
      case 'market-update':
        emailContent = (
          <PropertyNewsletterEmail
            mainProperty={properties[0]}
            secondaryProperties={[]}
            blogPosts={blogPosts}
            companyName="Alan Batt Estate Agents"
            companyLogo="/logo.png"
            companyAddress="78 Market Street, Wigan, WN1 1HX"
            companyPhone="01942 233 999"
            salesEmail="sales@alanbatt.co.uk"
            rentalsEmail="rentals@alanbatt.co.uk"
          />
        );
        break;
      
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid template ID' },
          { status: 400 }
        );
    }

    // Render the email to HTML
    const emailHtml = await render(emailContent);

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Alan Batt Estate Agents <newsletter@alanbatt.co.uk>',
      to: Array.isArray(to) ? to : [to],
      subject: emailSubject,
      html: emailHtml,
      text: emailPreviewText, // Fallback text version
      replyTo: 'info@alanbatt.co.uk',
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      data: {
        id: data?.id,
        to,
        subject: emailSubject,
        templateId,
        sentAt: new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send email',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
