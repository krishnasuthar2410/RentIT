const MongoClient = require("mongodb").MongoClient;
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const MONGODB_URI =
  "mongodb+srv://mdevanshi1406:Fvt4ylK2qB10o8Ge@rentit.zo7xkcf.mongodb.net/?retryWrites=true&w=majority";
const s3 = new S3Client({});
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(MONGODB_URI);
  const db = await client.db("rentit");
  cachedDb = db;
  return db;
}

exports.handler = (event, context) => {
try{
  context.callbackWaitsForEmptyEventLoop = false;

  switch(event.httpMethod)
  {
   case 'GET': 
         return getProduct(event);
   case 'POST':
         return createProduct(event);
   default:
         return {
           statusCode: 404,
           headers: {
             "Content-Type": "application/json"
           },
           body: JSON.stringify({
           message: "Page not found"
         })
       };
  }}
  catch(e)
  {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: e.message,
        error: "Nothing executed"
      })
    }
  }
};

const base64ToBytes = (base64) => {
  return Buffer.from(base64, 'base64');
}

const createProduct = async (event) => {
    const db = await connectToDatabase();
    const body = JSON.parse(event.body);
    let imagePath;
    if(body.image != null)
    {
      imagePath = await saveImageToS3(body.filename, base64ToBytes(body.image));
    }
    body.image = imagePath;
    const result = await db.collection("product").insertOne(body);
    const response = {
        statusCode: 200,
        body: JSON.stringify({body, result, imagePath})
    };
    return response;
}

const getProduct = async (event) => {
    const db = await connectToDatabase();
    const id = event?.queryStringParameters?.id;
    const userName = event?.queryStringParameters?.userName;
    if(id)
    {
        const product = await db.collection("product").findOne({id:id});
        const response = {
            statusCode: 200,
            body: JSON.stringify({product})
        }
        return response;
    }
    if(userName)
    {
        const products = await db.collection("product").find({userName:userName}).toArray();
        const response = {
            statusCode: 200,
            body: JSON.stringify(products)
        }
        return response;
    }
    const products = await db.collection("product").find({}).toArray();
    const response = {
        statusCode: 200,
        body: JSON.stringify(products)
    }
    return response;
}

const saveImageToS3 = async (filename, image) => {
  const uploadedImage = await s3.send(new PutObjectCommand({
    Bucket: "capstonerentitbucket",
    Key: filename,
    Body: image,
  }));
  return "https://capstonerentitbucket.s3.amazonaws.com/"+ filename;
}