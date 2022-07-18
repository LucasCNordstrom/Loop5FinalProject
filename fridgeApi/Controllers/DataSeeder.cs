using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Azure.Storage.Blobs;

namespace fridgeApi.Controllers;

public class DataSeeder
{
    BlobContainerClient containerClient;

    public DataSeeder()
    {
        var blobServiceClient = new BlobServiceClient("Azure_Connectionstring");
        containerClient = blobServiceClient.GetBlobContainerClient("fridgeappitems");
    }


    public async Task<ActionResult> UploadItem ()
    {
      var blobClient = containerClient.GetBlobClient("tests");
      Console.WriteLine("Uploading to Blob storage:\n\t {0}\n", blobClient.Uri);
      var newItem = new Item{
        Id = 1,
        Name = "Milk",
        ExpiryDate = DateTime.Today,
        Amount = 5,
        Measurement = "Litres"
      };
      var binary = new BinaryData(newItem);
      // Upload data from the local file
      //var meme = await blobClient.UploadAsync(binary, true);
      return new OkObjectResult(binary);
    }
}