const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb'); // Import ObjectId
const fs = require('fs');
const path = require('path'); 
async function importData() {
  const uri = "process.env.MONGO_URI";
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const database = client.db("ecomt");
    const collection = database.collection("products");
    
    // 1. Read & Parse JSON (with proper error handling)
    const filePath = path.join(__dirname, 'ecom.products.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(rawData);

    // 2. Convert Extended JSON → MongoDB-ready format
    const convertedData = data.map(item => ({
      ...item,
      _id: new ObjectId(item._id.$oid), // Convert "$oid" → ObjectId
      categories: item.categories?.map(cat => ({
        ...cat,
        _id: new ObjectId(cat._id.$oid) // Handle nested IDs
      }))
    }));

    // 3. Insert Data (with error handling)
    const result = await collection.insertMany(convertedData);
    console.log(`✅ Success! Inserted ${result.insertedCount} documents.`);
  } catch (error) {
    console.error('❌ Import failed:', error.message);
  } finally {
    await client.close();
  }
}

importData();
