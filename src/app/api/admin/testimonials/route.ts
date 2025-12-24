import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const db = await getDb();
        const testimonials = await db.collection('testimonials')
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        const formattedTestimonials = testimonials.map(t => ({
            ...t,
            id: t._id.toString(),
            _id: t._id.toString()
        }));

        return NextResponse.json({ testimonials: formattedTestimonials });
    } catch (error: any) {
        console.error('Error reading testimonials:', error);
        return NextResponse.json({
            error: 'Failed to read testimonials',
            details: error.message
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const db = await getDb();

        const newTestimonial = {
            ...body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const result = await db.collection('testimonials').insertOne(newTestimonial);

        return NextResponse.json({
            success: true,
            testimonial: { ...newTestimonial, id: result.insertedId.toString(), _id: result.insertedId.toString() }
        });
    } catch (error: any) {
        console.error('Error creating testimonial:', error);
        return NextResponse.json({
            error: 'Failed to create testimonial',
            details: error.message
        }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, _id, ...updates } = body;
        const targetId = id || _id;

        if (!targetId) {
            return NextResponse.json({ error: 'Testimonial ID is required' }, { status: 400 });
        }

        const db = await getDb();
        const result = await db.collection('testimonials').findOneAndUpdate(
            { _id: new ObjectId(targetId) },
            {
                $set: {
                    ...updates,
                    updatedAt: new Date().toISOString()
                }
            },
            { returnDocument: 'after' }
        );

        if (!result) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            testimonial: { ...result, id: result._id.toString(), _id: result._id.toString() }
        });
    } catch (error: any) {
        console.error('Error updating testimonial:', error);
        return NextResponse.json({
            error: 'Failed to update testimonial',
            details: error.message
        }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Testimonial ID is required' }, { status: 400 });
        }

        const db = await getDb();
        const result = await db.collection('testimonials').deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Testimonial deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting testimonial:', error);
        return NextResponse.json({
            error: 'Failed to delete testimonial',
            details: error.message
        }, { status: 500 });
    }
}
