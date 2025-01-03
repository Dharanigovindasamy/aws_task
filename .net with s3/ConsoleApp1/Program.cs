using System;
using System.IO;
using System.Threading.Tasks;
using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Newtonsoft.Json;

namespace ConsoleApp1
{
    public class UserData
    {
        public string name { get; set; }
        public int age { get; set; }
        public string mailId { get; set; }
    }

    class Program
    {
       
        // TODO 

        static async Task Main(string[] args)
        {
            var s3Client = new AmazonS3Client(accessKey, secretKey, RegionEndpoint.USEast1);

            try
            {
                Console.WriteLine("Downloading the JSON file from S3...");

                GetObjectResponse response = await s3Client.GetObjectAsync(bucketName, objectKey);
                Console.WriteLine(response.ToString());

                using (var reader = new StreamReader(response.ResponseStream))
                {
                    string jsonData = reader.ReadToEnd();
                    Console.WriteLine("JSON Data from S3: \n" + jsonData);

                    UserData userData = JsonConvert.DeserializeObject<UserData>(jsonData);

                    Console.WriteLine("\n--- User Data from S3 ---");
                    Console.WriteLine($"Name: {userData.name}");
                    Console.WriteLine($"Age: {userData.age}");
                    Console.WriteLine($"Mail ID: {userData.mailId}");
                }
            }
            catch (AmazonS3Exception e)
            {
                Console.WriteLine("Error encountered on server. Message:'{0}' when reading object", e.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine("Unknown encountered on server. Message:'{0}'", e.Message);
            }
        }
    }
}
