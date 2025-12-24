import { NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// Ensure data directory exists
async function ensureDataDir() {
    if (!existsSync(DATA_DIR)) {
        await mkdir(DATA_DIR, { recursive: true });
    }
    if (!existsSync(LEADS_FILE)) {
        await writeFile(LEADS_FILE, JSON.stringify([]));
    }
}

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

        // Ensure data directory exists
        await ensureDataDir();

        // Read existing leads
        const fileContent = await readFile(LEADS_FILE, 'utf-8');
        const leads = JSON.parse(fileContent);

        // Create new lead
        const newLead = {
            id: Date.now().toString(),
            ...body,
            status: 'NEW',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Add to leads array
        leads.push(newLead);

        // Save back to file
        await writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));

        // TODO: Send email notification to admin
        // TODO: Send auto-reply to customer

        return NextResponse.json({
            success: true,
            message: 'Thank you! We\'ll get back to you within 24 hours.',
            lead: newLead
        });

    } catch (error) {
        console.error('Error saving lead:', error);
        return NextResponse.json(
            { error: 'Failed to save lead' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await ensureDataDir();
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
