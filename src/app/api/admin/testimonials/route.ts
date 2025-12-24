import { NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const TESTIMONIALS_FILE = path.join(DATA_DIR, 'testimonials.json');

export const dynamic = 'force-dynamic';

async function ensureDataDir() {
    if (!existsSync(DATA_DIR)) {
        await mkdir(DATA_DIR, { recursive: true });
    }
    if (!existsSync(TESTIMONIALS_FILE)) {
        await writeFile(TESTIMONIALS_FILE, JSON.stringify([]));
    }
}

export async function GET() {
    try {
        await ensureDataDir();
        const fileContent = await readFile(TESTIMONIALS_FILE, 'utf-8');
        const testimonials = JSON.parse(fileContent);

        return NextResponse.json({ testimonials });
    } catch (error) {
        console.error('Error reading testimonials:', error);
        return NextResponse.json({ error: 'Failed to read testimonials' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        await ensureDataDir();
        const fileContent = await readFile(TESTIMONIALS_FILE, 'utf-8');
        const testimonials = JSON.parse(fileContent);

        const newTestimonial = {
            id: Date.now().toString(),
            ...body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        testimonials.push(newTestimonial);
        await writeFile(TESTIMONIALS_FILE, JSON.stringify(testimonials, null, 2));

        return NextResponse.json({ success: true, testimonial: newTestimonial });
    } catch (error) {
        console.error('Error creating testimonial:', error);
        return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, ...updates } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Testimonial ID is required' }, { status: 400 });
        }

        await ensureDataDir();
        const fileContent = await readFile(TESTIMONIALS_FILE, 'utf-8');
        const testimonials = JSON.parse(fileContent);

        const index = testimonials.findIndex((t: any) => t.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }

        testimonials[index] = {
            ...testimonials[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        await writeFile(TESTIMONIALS_FILE, JSON.stringify(testimonials, null, 2));

        return NextResponse.json({ success: true, testimonial: testimonials[index] });
    } catch (error) {
        console.error('Error updating testimonial:', error);
        return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Testimonial ID is required' }, { status: 400 });
        }

        await ensureDataDir();
        const fileContent = await readFile(TESTIMONIALS_FILE, 'utf-8');
        const testimonials = JSON.parse(fileContent);

        const filteredTestimonials = testimonials.filter((t: any) => t.id !== id);

        if (filteredTestimonials.length === testimonials.length) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }

        await writeFile(TESTIMONIALS_FILE, JSON.stringify(filteredTestimonials, null, 2));

        return NextResponse.json({ success: true, message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
    }
}
