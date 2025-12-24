import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

// GET - Fetch all leads
export async function GET() {
    try {
        const db = await getDb();
        const leads = await db.collection('leads')
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        // Map _id to id for frontend compatibility
        const formattedLeads = leads.map(lead => ({
            ...lead,
            id: lead._id.toString(),
            _id: lead._id.toString()
        }));

        return NextResponse.json({ leads: formattedLeads });
    } catch (error: any) {
        console.error('Error reading leads:', error);
        return NextResponse.json(
            { error: 'Failed to read leads', details: error.message },
            { status: 500 }
        );
    }
}

// PUT - Update a lead
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, _id, ...updates } = body;
        const targetId = id || _id;

        if (!targetId) {
            return NextResponse.json({ error: 'Lead ID is required' }, { status: 400 });
        }

        const db = await getDb();
        const result = await db.collection('leads').findOneAndUpdate(
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
            return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            lead: { ...result, id: result._id.toString(), _id: result._id.toString() }
        });
    } catch (error: any) {
        console.error('Error updating lead:', error);
        return NextResponse.json({
            error: 'Failed to update lead',
            details: error.message
        }, { status: 500 });
    }
}

// DELETE - Delete a lead
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Lead ID is required' }, { status: 400 });
        }

        const db = await getDb();
        const result = await db.collection('leads').deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting lead:', error);
        return NextResponse.json({
            error: 'Failed to delete lead',
            details: error.message
        }, { status: 500 });
    }
}
