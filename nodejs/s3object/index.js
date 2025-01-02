const { S3Client, GetObjectCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3");
const { Readable } = require("stream");

// Initialize S3 client
const s3Client = new S3Client({ region: "us-east-1" });

exports.handler = async (event) => {
    try {
        const bucketName = "taskuserdata";  

        // List objects in the bucket
        const listCommand = new ListObjectsV2Command({ Bucket: bucketName });
        const listResponse = await s3Client.send(listCommand);

        // If the bucket contains objects, log their names
        if (listResponse.Contents && listResponse.Contents.length > 0) {
            console.log("Objects in the bucket:");
            listResponse.Contents.forEach((object) => {
                console.log("Object Name:", object.Key);  // Display the object name
            });
        } else {
            console.log("No objects found in the bucket.");
        }

        // Fetch the object name from the event trigger
        const objectKey = event.Records[0].s3.object.key;
        console.log("Object Key from event:", objectKey);

        // Get the specific object from S3
        const getCommand = new GetObjectCommand({ Bucket: bucketName, Key: objectKey });
        const getResponse = await s3Client.send(getCommand);

        // Convert stream to string
        const streamToString = async (stream) => {
            const chunks = [];
            for await (const chunk of stream) {
                chunks.push(chunk);
            }
            return Buffer.concat(chunks).toString("utf-8");
        };

        const fileContent = await streamToString(getResponse.Body);

        console.log("File Content:", fileContent);

        // Additional processing if needed

    } catch (error) {
        console.error("Error:", error.message);
    }
};
