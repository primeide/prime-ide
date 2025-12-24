import { NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const INVOICES_FILE = path.join(DATA_DIR, 'invoices.json');

export const dynamic = 'force-dynamic';

async function ensureDataDir() {
    if (!existsSync(DATA_DIR)) {
        await mkdir(DATA_DIR, { recursive: true });
    }
    if (!existsSync(INVOICES_FILE)) {
        await writeFile(INVOICES_FILE, JSON.stringify([]));
    }
}

export async function GET() {
    try {
        await ensureDataDir();
        const fileContent = await readFile(INVOICES_FILE, 'utf-8');
        const invoices = fileContent ? JSON.parse(fileContent) : [];

        return NextResponse.json({ invoices });
    } catch (error) {
        console.error('Error reading invoices:', error);
        return NextResponse.json({ error: 'Failed to read invoices' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        await ensureDataDir();
        const fileContent = await readFile(INVOICES_FILE, 'utf-8');
        const invoices = fileContent ? JSON.parse(fileContent) : [];

        const newInvoice = {
            id: Date.now().toString(),
            invoiceNumber: `INV-${Date.now()}`,
            ...body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        invoices.push(newInvoice);
        await writeFile(INVOICES_FILE, JSON.stringify(invoices, null, 2));

        return NextResponse.json({ success: true, invoice: newInvoice });
    } catch (error) {
        console.error('Error creating invoice:', error);
        return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, ...updates } = body;

        if (!id) {
            return NextResponse.json({ error: 'Invoice ID is required' }, { status: 400 });
        }

        await ensureDataDir();
        const fileContent = await readFile(INVOICES_FILE, 'utf-8');
        const invoices = fileContent ? JSON.parse(fileContent) : [];

        const invoiceIndex = invoices.findIndex((inv: any) => String(inv.id) === String(id));

        if (invoiceIndex === -1) {
            return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
        }

        invoices[invoiceIndex] = {
            ...invoices[invoiceIndex],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        await writeFile(INVOICES_FILE, JSON.stringify(invoices, null, 2));
        return NextResponse.json({ success: true, invoice: invoices[invoiceIndex] });
    } catch (error) {
        console.error('Error updating invoice:', error);
        return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Invoice ID is required' }, { status: 400 });
        }

        await ensureDataDir();
        const fileContent = await readFile(INVOICES_FILE, 'utf-8');
        const invoices = fileContent ? JSON.parse(fileContent) : [];

        const filteredInvoices = invoices.filter((inv: any) => String(inv.id) !== String(id));

        if (filteredInvoices.length === invoices.length) {
            return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
        }

        await writeFile(INVOICES_FILE, JSON.stringify(filteredInvoices, null, 2));
        return NextResponse.json({ success: true, message: 'Invoice deleted successfully' });
    } catch (error) {
        console.error('Error deleting invoice:', error);
        return NextResponse.json({ error: 'Failed to delete invoice' }, { status: 500 });
    }
}
