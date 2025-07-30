import { MongoClient } from 'mongodb';

// MongoDB connection setup
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'crypticKey';

export default async function handler(req, res) {
    console.log('API called:', req.method, 'URL:', req.url);
    console.log('Environment check:', process.env.MONGODB_URI ? 'DB_URI_EXISTS' : 'NO_DB_URI');
    
    // Handle CORS manually
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        console.log('OPTIONS request handled');
        return res.status(200).end();
    }

    // Test response for debugging
    if (!process.env.MONGODB_URI) {
        console.error('No MongoDB URI found in environment');
        return res.status(500).json({ error: 'Database not configured' });
    }

    let client;
    try {
        console.log('Attempting to connect to MongoDB...');
        client = new MongoClient(url);
        await client.connect();
        console.log('Connected to MongoDB successfully');
        
        const db = client.db(dbName);
        const collection = db.collection('passwords');

        switch (req.method) {
            case 'GET':
                console.log('GET request - fetching passwords');
                const passwords = await collection.find({}).toArray();
                console.log('Found documents =>', passwords.length, 'items');
                return res.status(200).json(passwords);

            case 'POST':
                console.log('POST request - saving password');
                const password = req.body;
                console.log('Request body:', password);
                
                if (!password || !password.site || !password.username || !password.password) {
                    console.log('Missing required fields');
                    return res.status(400).json({ error: 'Missing required fields' });
                }
                
                const insertResult = await collection.insertOne(password);
                console.log('Inserted document =>', insertResult.insertedId);
                return res.status(200).json({ success: true, result: insertResult });

            case 'DELETE':
                console.log('DELETE request');
                const deleteData = req.body;
                console.log('Delete data:', deleteData);
                
                if (!deleteData || !deleteData.id) {
                    return res.status(400).json({ error: 'Missing id field' });
                }
                
                const deleteResult = await collection.deleteOne({ id: deleteData.id });
                console.log('Deleted document =>', deleteResult.deletedCount);
                return res.status(200).json({ success: true, result: deleteResult });

            default:
                res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
                return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
        }
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ 
            error: 'Database connection failed', 
            details: error.message,
            stack: error.stack 
        });
    } finally {
        if (client) {
            await client.close();
        }
    }
}
