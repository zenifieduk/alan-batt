import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, readdirSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import fs from 'fs/promises';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  image?: string;
  content: string;
  date?: string;
}

export async function GET() {
  try {
    const articlesDir = path.join(process.cwd(), 'public/articles');
    const files = readdirSync(articlesDir).filter(file => file.endsWith('.md'));
    
    const blogPosts: BlogPost[] = [];
    
    for (const file of files) {
      if (file === 'README.md') continue;
      
      const filePath = path.join(articlesDir, file);
      const content = readFileSync(filePath, 'utf-8');
      
      // Extract frontmatter and content
      const lines = content.split('\n');
      let inFrontmatter = false;
      let frontmatter: string[] = [];
      let markdownContent: string[] = [];
      
      for (const line of lines) {
        if (line === '---') {
          if (!inFrontmatter) {
            inFrontmatter = true;
          } else {
            inFrontmatter = false;
          }
          continue;
        }
        
        if (inFrontmatter) {
          frontmatter.push(line);
        } else {
          markdownContent.push(line);
        }
      }
      
      // Parse frontmatter (simple parsing - you might want to use a proper YAML parser)
      const title = frontmatter.find(line => line.startsWith('title:'))?.replace('title:', '').trim() || file.replace('.md', '');
      const excerpt = markdownContent.slice(0, 3).join(' ').substring(0, 150) + '...';
      
      const slug = file.replace('.md', '');
      
      blogPosts.push({
        id: slug,
        title,
        excerpt,
        slug,
        content: markdownContent.join('\n'),
        image: `/images/blog/${slug}.jpg`, // Placeholder image path
        date: new Date().toISOString() // You might want to extract this from frontmatter
      });
    }
    
    return NextResponse.json({
      success: true,
      data: blogPosts,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch blog posts',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
