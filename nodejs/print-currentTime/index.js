exports.handler = async (event, context) => {
    const currentTime = new Date().toISOString();
    console.log(`The Lambda function ran at: ${currentTime}`);
    return {
        statusCode: 200,
        body: `Function ran at ${currentTime}`
    };
};
