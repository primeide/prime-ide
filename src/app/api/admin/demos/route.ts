import { NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DEMOS_FILE = path.join(DATA_DIR, 'demos.json');

export const dynamic = 'force-dynamic';

async function ensureDataDir() {
    if (!existsSync(DATA_DIR)) {
        await mkdir(DATA_DIR, { recursive: true });
    }
    if (!existsSync(DEMOS_FILE)) {
        await writeFile(DEMOS_FILE, JSON.stringify([]));
    }
}

export async function GET() {
    try {
        await ensureDataDir();
        const fileContent = await readFile(DEMOS_FILE, 'utf-8');
        const demos = JSON.parse(fileContent);

        return NextResponse.json({ demos });
    } catch (error) {
        console.error('Error reading demos:', error);
        return NextResponse.json({ error: 'Failed to read demos' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        await ensureDataDir();
        const fileContent = await readFile(DEMOS_FILE, 'utf-8');
        const demos = JSON.parse(fileContent);

        const newDemo = {
            id: Date.now().toString(),
            ...body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        demos.push(newDemo);
        await writeFile(DEMOS_FILE, JSON.stringify(demos, null, 2));

        return NextResponse.json({ success: true, demo: newDemo });
    } catch (error) {
        console.error('Error creating demo:', error);
        return NextResponse.json({ error: 'Failed to create demo' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, ...updates } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Demo ID is required' }, { status: 400 });
        }

        await ensureDataDir();
        const fileContent = await readFile(DEMOS_FILE, 'utf-8');
        const demos = JSON.parse(fileContent);

        const index = demos.findIndex((d: any) => d.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Demo not found' }, { status: 404 });
        }

        demos[index] = {
            ...demos[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        await writeFile(DEMOS_FILE, JSON.stringify(demos, null, 2));

        return NextResponse.json({ success: true, demo: demos[index] });
    } catch (error) {
        console.error('Error updating demo:', error);
        return NextResponse.json({ error: 'Failed to update demo' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Demo ID is required' }, { status: 400 });
        }

        await ensureDataDir();
        const fileContent = await readFile(DEMOS_FILE, 'utf-8');
        const demos = JSON.parse(fileContent);

        const filteredDemos = demos.filter((d: any) => d.id !== id);

        if (filteredDemos.length === demos.length) {
            return NextResponse.json({ error: 'Demo not found' }, { status: 404 });
        }

        await writeFile(DEMOS_FILE, JSON.stringify(filteredDemos, null, 2));

        return NextResponse.json({ success: true, message: 'Demo deleted successfully' });
    } catch (error) {
        console.error('Error deleting demo:', error);
        return NextResponse.json({ error: 'Failed to delete demo' }, { status: 500 });
    }
}
