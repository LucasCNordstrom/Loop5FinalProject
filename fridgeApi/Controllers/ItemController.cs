using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Azure.Storage.Blobs;
using System.Linq;

namespace fridgeApi.Controllers;

[Route("Items")]
[ApiController]
public class ItemController : ControllerBase
{
    private readonly ItemContext _context;
    private readonly IConfiguration _config;

    private readonly ILogger<ItemController> _logger;

    public ItemController(ItemContext context, IConfiguration config, ILogger<ItemController> logger)
    {
        _context = context;
        _config = config;
        _logger = logger;
    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<ItemResponse>>> GetAllItemsForUser(string userId)
    {
        if (string.IsNullOrEmpty(userId)) return BadRequest("Requires a user Id");
        if (_context.Item == null) return NotFound("No database found");
        if (!UserExists(userId)) return Ok(new List<ItemResponse>());

        return Ok(await (from item in _context.Item.Where<Item>(it => it.UserId == userId)
                         let newItem = new ItemResponse
                         {
                             UniqueId = item.UniqueId,
                             Name = item.Name,
                             ExpiryDate = item.ExpiryDate,
                             Amount = item.Amount,
                             Measurement = item.Measurement
                         }
                         select newItem).ToListAsync());
    }

     [HttpGet("{uniqueId}")]
    public async Task<ActionResult<IEnumerable<ItemResponse>>> GetSpecificItem(string uniqueId) //this should take users id
    {
        if(!ItemExists(uniqueId)) return NotFound("Item does not exist");

        var dbItem = await _context.Item.FirstOrDefaultAsync(i => i.UniqueId == uniqueId);
        var itemResponse = new ItemResponse{
            Name = dbItem.Name,
            UniqueId = dbItem.UniqueId,
            ExpiryDate = dbItem.ExpiryDate,
            Amount = dbItem.Amount,
            Measurement = dbItem.Measurement
        };
        return Ok(itemResponse);
    }

    [HttpPut("edit")]
    public async Task<IActionResult> EditItem(PostItemRequest item)
    {
        if (string.IsNullOrEmpty(item.UniqueId)) return BadRequest();
        var itemInDb = await _context.Item.FirstOrDefaultAsync(e => e.UniqueId == item.UniqueId);
        itemInDb.Name = item.Name;
        itemInDb.ExpiryDate = item.ExpiryDate;
        itemInDb.Amount = item.Amount;
        itemInDb.Measurement = item.Unit;
        itemInDb.UserId = item.UserId;
        try
        {
            await _context.SaveChangesAsync();
            return Ok("changed successfully");
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ItemExists(item.UniqueId))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
    }

    [HttpPost]
    public async Task<ActionResult> AddItemToDb(PostItemRequest item)
    {
        var newItem = new Item
        {
            UserId = item.UserId,
            UniqueId = Guid.NewGuid().ToString(),
            Name = item.Name,
            ExpiryDate = item.ExpiryDate,
            Amount = item.Amount,
            Measurement = item.Unit,
            Category = "itemRequest.Category",
            Location = "itemRequest.Location"
        };
        if (_context == null || _context.Item == null) return NotFound();

        await _context.Item.AddAsync(newItem);
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteItem(DeleteItemRequest itemToDelete)
    {
        if (_context.Item == null) return NotFound();
        
        var item = await _context.Item
                    .FirstOrDefaultAsync(e => e.UniqueId == itemToDelete.UniqueId);

        if (item == null) return NotFound();
        
        _context.Item.Remove(item);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // Helper Methods and Superflous Getters for testing below:
    private bool ItemExists(string id)
    {
        return (_context.Item?.Any(e => e.UniqueId == id)).GetValueOrDefault();
    }

    private bool UserExists(string id)
    {
        return (_context.Item?.Any(e => e.UserId == id)).GetValueOrDefault();
    }

    [HttpGet("GetAllItems")]
    public async Task<ActionResult<IEnumerable<ItemResponse>>> GetEveryItemInDb()
    {
        return Ok(await (from item in _context.Item
                         let newItem = new ItemResponse
                         {
                             UniqueId = item.UniqueId,
                             Name = item.Name,
                             ExpiryDate = item.ExpiryDate,
                             Amount = item.Amount,
                             Measurement = item.Measurement
                         }
                         select newItem).ToListAsync());
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ItemResponse>>> GetCheatedItems()
    {
        var itemResponses = new List<ItemResponse> {
            new ItemResponse{
                UniqueId = Guid.NewGuid().ToString(),
                Name ="Milk",
                ExpiryDate = DateTime.Today.AddMonths(1),
                Amount = 5,
                Measurement = "Litres"
            },
            new ItemResponse{
                UniqueId = Guid.NewGuid().ToString(),
                Name ="Honey",
                ExpiryDate = DateTime.Today.AddMonths(11),
                Amount = 3,
                Measurement = "Kilo"
            },
            new ItemResponse{
                UniqueId = Guid.NewGuid().ToString(),
                Name ="Meat",
                ExpiryDate = DateTime.Today.AddDays(4),
                Amount = 500,
                Measurement = "Gram"
            }
        };
        return Ok(itemResponses);
    }
}

