import { NextResponse } from 'next/server';
import { fetchProperties, fetchBlogPosts } from '@/lib/email-utils';

export async function GET() {
  try {
    const [properties, blogPosts] = await Promise.all([
      fetchProperties(),
      fetchBlogPosts()
    ]);

    return NextResponse.json({
      success: true,
      properties,
      blogPosts
    });
  } catch (error) {
    console.error('Error fetching email data:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
