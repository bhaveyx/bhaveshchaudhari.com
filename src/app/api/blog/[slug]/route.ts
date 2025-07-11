import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface RouteParams {
    params: Promise<{ slug: string }>
}

export async function GET(
    request: Request,
    { params }: RouteParams
) {
    const { slug } = await params;
    const filePath = path.join(process.cwd(), 'src', 'data', 'blog', `${slug}.mdx`);

    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        return new NextResponse(content, {
            headers: {
                'Content-Type': 'text/markdown',
            },
        });
    } catch {
        return new NextResponse('Not Found', { status: 404 });
    }
}
