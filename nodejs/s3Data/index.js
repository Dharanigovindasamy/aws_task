// const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
// const { Readable } = require("stream");

// // Configure S3 client
// const s3Client = new S3Client({
//     region: "us-east-1", // Replace with your region
//     credentials: {
//         accessKeyId: "AKIAZKDICYPJ7OU672XJ", // Replace with your Access Key
//         secretAccessKey: "6S7e0RpCJMXz6+YxE7m+o4YdWugAuLFC+z5mEjqe" // Replace with your Secret Access Key
//     }
// });

// const fetchS3Data = async () => {
//     try {
//         const bucketName = "taskuserdata"; // Replace with your bucket name
//         const objectKey = "sample.json"; // Replace with your file name

//         console.log("Attempting to fetch object...");
// console.log(`Bucket: ${bucketName}`);
// console.log(`Key: ${objectKey}`);

//         // Get the object from S3
//         const command = new GetObjectCommand({
//             Bucket: bucketName,
//             Key: objectKey
//         });

//         const response = await s3Client.send(command);

//         // Convert the Readable Stream to a string
//         const streamToString = async (stream) => {
//             const chunks = [];
//             for await (const chunk of stream) {
//                 chunks.push(chunk);
//             }
//             return Buffer.concat(chunks).toString("utf-8");
//         };

//         const fileContent = await streamToString(response.Body);

//         // Parse and display JSON data
//         const jsonData = JSON.parse(fileContent);
//         console.log("Data fetched from S3:", jsonData);

//         console.log("Name:", jsonData.name);
//         console.log("Age:", jsonData.age);
//         console.log("Mail ID:", jsonData.mailId);

//     } catch (error) {
//         console.error("Error fetching data from S3:", error.message);
//     }
// };

// // Run the function
// fetchS3Data();

// // const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
// // const { Readable } = require("stream");

// // // Configure S3 client
// // const s3Client = new S3Client({
// //     region: "us-east-1", // Replace with your region
// //     credentials: {
// //         accessKeyId: "AKIAZKDICYPJ7OU672XJ", // Replace with your Access Key
// //         secretAccessKey: "6S7e0RpCJMXz6+YxE7m+o4YdWugAuLFC+z5mEjqe" // Replace with your Secret Access Key
// //     }
// // });

// // const fetchS3Data = async () => {
// //     try {
// //         const bucketName = "taskuserdata"; // Replace with your bucket name
// //         const objectKey = "sample.json"; // Replace with your file name

// //         console.log("Attempting to fetch object...");
// //         console.log(`Bucket: ${bucketName}`);
// //         console.log(`Key: ${objectKey}`);

// //         // Get the object from S3
// //         const command = new GetObjectCommand({
// //             Bucket: bucketName,
// //             Key: objectKey
// //         });

// //         const response = await s3Client.send(command);

// //         // Convert the Readable Stream to a string
// //         const streamToString = async (stream) => {
// //             const chunks = [];
// //             for await (const chunk of stream) {
// //                 chunks.push(chunk);
// //             }
// //             return Buffer.concat(chunks).toString("utf-8");
// //         };

// //         const fileContent = await streamToString(response.Body);

// //         // Parse and display JSON data
// //         const jsonData = JSON.parse(fileContent);
// //         console.log("Data fetched from S3:", jsonData);

// //         console.log("Name:", jsonData.name);
// //         console.log("Age:", jsonData.age);
// //         console.log("Mail ID:", jsonData.mailId);

// //     } catch (error) {
// //         console.error("Error fetching data from S3:", error.message);
// //     }
// // };

// // // Lambda handler
// // exports.handler = async (event) => {
// //     await fetchS3Data();
// // };


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
