const { handler } = require('./index');

(async () => {
    try {
        // Simulated event object passed to the Lambda function
        const event = {}; // Add properties as needed
        const response = await handler(event);
        console.log('Lambda Function Output:');
        console.log(response);
    } catch (error) {
        console.error('Error:', error);
    }
})();
