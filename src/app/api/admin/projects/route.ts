import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const db = await getDb();
        const projects = await db.collection('projects')
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        const formattedProjects = projects.map(project => ({
            ...project,
            id: project._id.toString(),
            _id: project._id.toString()
        }));

        return NextResponse.json({ projects: formattedProjects });
    } catch (error: any) {
        console.error('Error reading projects:', error);
        return NextResponse.json({
            error: 'Failed to read projects',
            details: error.message
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const db = await getDb();

        const newProject = {
            ...body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const result = await db.collection('projects').insertOne(newProject);

        return NextResponse.json({
            success: true,
            project: { ...newProject, id: result.insertedId.toString(), _id: result.insertedId.toString() }
        });
    } catch (error: any) {
        console.error('Error creating project:', error);
        return NextResponse.json({
            error: 'Failed to create project',
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
            return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
        }

        const db = await getDb();
        const result = await db.collection('projects').findOneAndUpdate(
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
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            project: { ...result, id: result._id.toString(), _id: result._id.toString() }
        });
    } catch (error: any) {
        console.error('Error updating project:', error);
        return NextResponse.json({
            error: 'Failed to update project',
            details: error.message
        }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
        }

        const db = await getDb();
        const result = await db.collection('projects').deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Project deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting project:', error);
        return NextResponse.json({
            error: 'Failed to delete project',
            details: error.message
        }, { status: 500 });
    }
}
