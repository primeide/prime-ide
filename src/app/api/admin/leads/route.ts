import { NextResponse } from 'next/server';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

export const dynamic = 'force-dynamic';

async function ensureDataDir() {
    if (!existsSync(DATA_DIR)) {
        await mkdir(DATA_DIR, { recursive: true });
    }
    if (!existsSync(LEADS_FILE)) {
        await writeFile(LEADS_FILE, JSON.stringify([]));
    }
}

// GET - Fetch all leads
export async function GET() {
    try {
        await ensureDataDir();
        const fileContent = await readFile(LEADS_FILE, 'utf-8');
        const leads = fileContent ? JSON.parse(fileContent) : [];

        return NextResponse.json({ leads });
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
        const { id, ...updates } = body;

        if (!id) {
            return NextResponse.json({ error: 'Lead ID is required' }, { status: 400 });
        }

        await ensureDataDir();
        const fileContent = await readFile(LEADS_FILE, 'utf-8');
        const leads = fileContent ? JSON.parse(fileContent) : [];

        const leadIndex = leads.findIndex((lead: any) => String(lead.id) === String(id));

        if (leadIndex === -1) {
            return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
        }

        leads[leadIndex] = {
            ...leads[leadIndex],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        await writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
        return NextResponse.json({ success: true, lead: leads[leadIndex] });
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

        await ensureDataDir();
        const fileContent = await readFile(LEADS_FILE, 'utf-8');
        const leads = fileContent ? JSON.parse(fileContent) : [];

        const filteredLeads = leads.filter((lead: any) => String(lead.id) !== String(id));

        if (filteredLeads.length === leads.length) {
            return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
        }

        await writeFile(LEADS_FILE, JSON.stringify(filteredLeads, null, 2));
        return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting lead:', error);
        return NextResponse.json({
            error: 'Failed to delete lead',
            details: error.message
        }, { status: 500 });
    }
}
