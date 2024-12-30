using Amazon.Lambda.Core;

[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace HelloWorldLambda
{
    public class Function
    {
        public string FunctionHandler(string input, ILambdaContext context)
        {
            context.Logger.LogLine("Executing Hello World Lambda function...");
            string message = $"Hello, World! You said: {input}";
            context.Logger.LogLine($"Generated message: {message}");
            return message;
        }
    }
}
