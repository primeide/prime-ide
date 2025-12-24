import { NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');

async function ensureDataDir() {
    if (!existsSync(DATA_DIR)) {
        await mkdir(DATA_DIR, { recursive: true });
    }
    if (!existsSync(PROJECTS_FILE)) {
        await writeFile(PROJECTS_FILE, JSON.stringify([]));
    }
}

export async function GET() {
    try {
        await ensureDataDir();
        const fileContent = await readFile(PROJECTS_FILE, 'utf-8');
        const projects = JSON.parse(fileContent);

        return NextResponse.json({ projects });
    } catch (error) {
        console.error('Error reading projects:', error);
        return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        await ensureDataDir();
        const fileContent = await readFile(PROJECTS_FILE, 'utf-8');
        const projects = JSON.parse(fileContent);

        const newProject = {
            id: Date.now().toString(),
            ...body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        projects.push(newProject);
        await writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2));

        return NextResponse.json({ success: true, project: newProject });
    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, ...updates } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
        }

        const fileContent = await readFile(PROJECTS_FILE, 'utf-8');
        const projects = JSON.parse(fileContent);

        const projectIndex = projects.findIndex((p: any) => p.id === id);

        if (projectIndex === -1) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        projects[projectIndex] = {
            ...projects[projectIndex],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        await writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2));

        return NextResponse.json({ success: true, project: projects[projectIndex] });
    } catch (error) {
        console.error('Error updating project:', error);
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
        }

        const fileContent = await readFile(PROJECTS_FILE, 'utf-8');
        const projects = JSON.parse(fileContent);

        const filteredProjects = projects.filter((p: any) => p.id !== id);

        if (filteredProjects.length === projects.length) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        await writeFile(PROJECTS_FILE, JSON.stringify(filteredProjects, null, 2));

        return NextResponse.json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
