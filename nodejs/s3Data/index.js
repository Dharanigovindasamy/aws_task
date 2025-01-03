const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { Readable } = require("stream");

const s3Client = new S3Client({ region: "us-east-1" });

exports.handler = async (event) => {
    try {
        const bucketName = event.Records[0].s3.bucket.name;
        const objectKey = event.Records[0].s3.object.key;

        console.log("Bucket Name:", bucketName);
        console.log("Object Key:", objectKey);

        // Get object from S3
        const command = new GetObjectCommand({ Bucket: bucketName, Key: objectKey });
        const response = await s3Client.send(command);

        // Convert stream to string
        const streamToString = async (stream) => {
            const chunks = [];
            for await (const chunk of stream) {
                chunks.push(chunk);
            }
            return Buffer.concat(chunks).toString("utf-8");
        };

        const fileContent = await streamToString(response.Body);

        console.log("File Content:", fileContent);

        // Additional processing (if needed)
    } catch (error) {
        console.error("Error:", error.message);
    }
};
