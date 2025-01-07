const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

const snsClient = new SNSClient({ region: "us-east-1" });

exports.handler = async (event) => {
    try {
        const bucketName = event.Records[0].s3.bucket.name;
        const objectKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
        const eventName = event.Records[0].eventName;

        let message = "";
        if (eventName.startsWith("ObjectCreated:")) {
            message = `An object '${objectKey}' was created in bucket '${bucketName}'.`;
        } else if (eventName.startsWith("ObjectRemoved:")) {
            message = `An object '${objectKey}' was deleted from bucket '${bucketName}'.`;
        } else {
            message = `An unknown event '${eventName}' occurred for object '${objectKey}' in bucket '${bucketName}'.`;
        }

        console.log("Notification message:", message);

        // Send message to SNS
        const publishParams = {
            TopicArn: "arn:aws:sns:us-east-1:640168412115:S3EventNotifications", 
            Message: message,
            Subject: `S3 Bucket Event: ${eventName}`
        };

        const snsResponse = await snsClient.send(new PublishCommand(publishParams));
        console.log("SNS Response:", snsResponse);

    } catch (error) {
        console.error("Error processing event:", error);
    }
};
