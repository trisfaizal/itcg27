import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Standard MIME types mapping for image and document uploads
const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.avif': 'image/avif',
  '.pdf': 'application/pdf',
};

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const pathSegments = params.path;
    if (!pathSegments || pathSegments.length === 0) {
      return new NextResponse('Not Found', { status: 404 });
    }

    // Security check: strictly disallow directory traversal
    for (const segment of pathSegments) {
      if (
        segment === '..' ||
        segment === '.' ||
        segment.includes('/') ||
        segment.includes('\\')
      ) {
        return new NextResponse('Forbidden', { status: 403 });
      }
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const relativeFilePath = path.join(...pathSegments);
    const resolvedPath = path.resolve(uploadsDir, relativeFilePath);

    // Ensure resolvedPath stays within uploads directory boundary
    if (!resolvedPath.startsWith(uploadsDir)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    if (!fs.existsSync(resolvedPath)) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const stats = fs.statSync(resolvedPath);
    if (!stats.isFile()) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const ext = path.extname(resolvedPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const fileBuffer = fs.readFileSync(resolvedPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': stats.size.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving runtime uploaded file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
