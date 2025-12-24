import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const db = await getDb();
        const invoices = await db.collection('invoices')
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        const formattedInvoices = invoices.map(inv => ({
            ...inv,
            id: inv._id.toString(),
            _id: inv._id.toString()
        }));

        return NextResponse.json({ invoices: formattedInvoices });
    } catch (error: any) {
        console.error('Error reading invoices:', error);
        return NextResponse.json({
            error: 'Failed to read invoices',
            details: error.message
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const db = await getDb();

        const newInvoice = {
            invoiceNumber: `INV-${Date.now()}`,
            ...body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const result = await db.collection('invoices').insertOne(newInvoice);

        return NextResponse.json({
            success: true,
            invoice: { ...newInvoice, id: result.insertedId.toString(), _id: result.insertedId.toString() }
        });
    } catch (error: any) {
        console.error('Error creating invoice:', error);
        return NextResponse.json({
            error: 'Failed to create invoice',
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
            return NextResponse.json({ error: 'Invoice ID is required' }, { status: 400 });
        }

        const db = await getDb();
        const result = await db.collection('invoices').findOneAndUpdate(
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
            return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            invoice: { ...result, id: result._id.toString(), _id: result._id.toString() }
        });
    } catch (error: any) {
        console.error('Error updating invoice:', error);
        return NextResponse.json({
            error: 'Failed to update invoice',
            details: error.message
        }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Invoice ID is required' }, { status: 400 });
        }

        const db = await getDb();
        const result = await db.collection('invoices').deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Invoice deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting invoice:', error);
        return NextResponse.json({
            error: 'Failed to delete invoice',
            details: error.message
        }, { status: 500 });
    }
}
