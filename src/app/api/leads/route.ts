import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate required fields
        const { name, email, phone, requirement, platform } = body;
        if (!name || !email || !phone || !requirement || !platform) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const db = await getDb();

        // Create new lead
        const newLead = {
            ...body,
            status: 'NEW',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const result = await db.collection('leads').insertOne(newLead);

        return NextResponse.json({
            success: true,
            message: 'Thank you! We\'ll get back to you within 24 hours.',
            lead: { ...newLead, id: result.insertedId.toString(), _id: result.insertedId.toString() }
        });

    } catch (error: any) {
        console.error('Error saving lead:', error);
        return NextResponse.json(
            { error: 'Failed to save lead', details: error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const db = await getDb();
        const leads = await db.collection('leads')
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

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
