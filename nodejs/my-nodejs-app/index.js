exports.handler = async (event) => {
    let name = "Dharani";
    let age = 22;
    let mailId = "dharani@gmail.com";

    console.log("Welcome! Hello World");
    console.log("Name:", name);
    console.log("Age:", age);
    console.log("Mail ID:", mailId);

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Hello from Lambda!",
            name: name,
            age: age,
            mailId: mailId
        }),
    };
};
