import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

export const dynamic = 'force-dynamic';

// GET - Fetch all leads
export async function GET() {
    try {
        if (!existsSync(LEADS_FILE)) {
            return NextResponse.json({ leads: [] });
        }

        const fileContent = await readFile(LEADS_FILE, 'utf-8');
        const leads = JSON.parse(fileContent);

        return NextResponse.json({ leads });
    } catch (error) {
        console.error('Error reading leads:', error);
        return NextResponse.json(
            { error: 'Failed to read leads' },
            { status: 500 }
        );
    }
}

// PUT - Update a lead
export async function PUT(request: Request) {
    try {
        const { id, ...updates } = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: 'Lead ID is required' },
                { status: 400 }
            );
        }

        const fileContent = await readFile(LEADS_FILE, 'utf-8');
        const leads = JSON.parse(fileContent);

        const leadIndex = leads.findIndex((lead: any) => lead.id === id);

        if (leadIndex === -1) {
            return NextResponse.json(
                { error: 'Lead not found' },
                { status: 404 }
            );
        }

        leads[leadIndex] = {
            ...leads[leadIndex],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        await writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));

        return NextResponse.json({
            success: true,
            lead: leads[leadIndex]
        });

    } catch (error) {
        console.error('Error updating lead:', error);
        return NextResponse.json(
            { error: 'Failed to update lead' },
            { status: 500 }
        );
    }
}

// DELETE - Delete a lead
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Lead ID is required' },
                { status: 400 }
            );
        }

        const fileContent = await readFile(LEADS_FILE, 'utf-8');
        const leads = JSON.parse(fileContent);

        const filteredLeads = leads.filter((lead: any) => lead.id !== id);

        if (filteredLeads.length === leads.length) {
            return NextResponse.json(
                { error: 'Lead not found' },
                { status: 404 }
            );
        }

        await writeFile(LEADS_FILE, JSON.stringify(filteredLeads, null, 2));

        return NextResponse.json({
            success: true,
            message: 'Lead deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting lead:', error);
        return NextResponse.json(
            { error: 'Failed to delete lead' },
            { status: 500 }
        );
    }
}
