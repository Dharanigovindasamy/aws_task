using Amazon.Lambda.Core;
using Amazon.Lambda.Serialization.SystemTextJson;

// Lambda serializer configuration
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace MyLambdaFunction
{
    public class Function
    {
        public string FunctionHandler(string input, ILambdaContext context)
        {
            context.Logger.LogLine("Executing Hello World Lambda function...");
            return $"Hello, World! You said: {input}";
        }
    }
}
