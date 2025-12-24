import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const db = await getDb();
        const demos = await db.collection('demos')
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        const formattedDemos = demos.map(demo => ({
            ...demo,
            id: demo._id.toString(),
            _id: demo._id.toString()
        }));

        return NextResponse.json({ demos: formattedDemos });
    } catch (error: any) {
        console.error('Error reading demos:', error);
        return NextResponse.json({
            error: 'Failed to read demos',
            details: error.message
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const db = await getDb();

        const newDemo = {
            ...body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const result = await db.collection('demos').insertOne(newDemo);

        return NextResponse.json({
            success: true,
            demo: { ...newDemo, id: result.insertedId.toString(), _id: result.insertedId.toString() }
        });
    } catch (error: any) {
        console.error('Error creating demo:', error);
        return NextResponse.json({
            error: 'Failed to create demo',
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
            return NextResponse.json({ error: 'Demo ID is required' }, { status: 400 });
        }

        const db = await getDb();
        const result = await db.collection('demos').findOneAndUpdate(
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
            return NextResponse.json({ error: 'Demo not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            demo: { ...result, id: result._id.toString(), _id: result._id.toString() }
        });
    } catch (error: any) {
        console.error('Error updating demo:', error);
        return NextResponse.json({
            error: 'Failed to update demo',
            details: error.message
        }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Demo ID is required' }, { status: 400 });
        }

        const db = await getDb();
        const result = await db.collection('demos').deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Demo not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Demo deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting demo:', error);
        return NextResponse.json({
            error: 'Failed to delete demo',
            details: error.message
        }, { status: 500 });
    }
}
