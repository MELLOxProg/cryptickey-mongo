export default function handler(req, res) {
    console.log('Test API called with method:', req.method);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    res.status(200).json({ 
        message: 'API is working!', 
        method: req.method,
        timestamp: new Date().toISOString(),
        env: process.env.MONGODB_URI ? 'DB_CONNECTED' : 'NO_DB'
    });
}
