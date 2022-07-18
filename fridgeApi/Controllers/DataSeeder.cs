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
      // Upload data from the local file
      var meme = await blobClient.UploadAsync("meme", true);
      return new OkObjectResult(meme);
    }
}