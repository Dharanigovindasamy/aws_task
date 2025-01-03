import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

// Initialize the SNS client
const snsClient = new SNSClient({ region: "us-east-1" });

// Define the handler function
export const handler = async (event) => {
    const topicArn = "arn:aws:sns:us-east-1:640168412115:sample_mail_notification";
    console.log("Topic ARN:", topicArn);

    const params = {
        TopicArn: topicArn,
        Subject: "Important Notification",
        Message: "Hello! This is a test email notification sent via AWS SNS.",
    };

    try {
        const response = await snsClient.send(new PublishCommand(params));
        console.log("Email notification sent successfully!", response);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Notification sent successfully!" }),
        };
    } catch (error) {
        console.error("Failed to send email notification:", error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
