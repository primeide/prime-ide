const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const uri = "mongodb+srv://primeidecompany_db_user:aBooKZuVvgXfhuJD@cluster1.q035jck.mongodb.net/?appName=Cluster1";
const dataDir = path.join(__dirname, '..', 'data');

async function migrate() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db();

        const collections = ['leads', 'demos', 'testimonials', 'projects', 'invoices'];

        for (const name of collections) {
            const filePath = path.join(dataDir, `${name}.json`);
            if (fs.existsSync(filePath)) {
                console.log(`Migrating ${name}...`);
                const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                if (Array.isArray(data) && data.length > 0) {
                    // Remove id field if it's there to let Mongo generate _id, or keep it?
                    // Better to keep it as a field for now if existing code expects it.
                    await db.collection(name).deleteMany({}); // Clear existing
                    await db.collection(name).insertMany(data);
                    console.log(`Successfully migrated ${data.length} items to ${name}`);
                }
            } else {
                console.log(`File ${filePath} not found, skipping.`);
            }
        }
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await client.close();
    }
}

migrate();
