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

    // GET: api/Item
    [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<ItemResponse>>> GetAllItems(string userId)  //should take a searchquery
    {
        string? searchQuery = "";
        if(string.IsNullOrEmpty(userId)) return BadRequest("Requires a user Id");
        if (_context.Item == null) return NotFound();
        if(!UserExists(userId)) return Ok(new List<ItemResponse>());

        if (!string.IsNullOrEmpty(searchQuery))
        {
            var item = await _context.Item.Where<Item>(i => i.Name.Contains(searchQuery) && i.UserId == userId).ToListAsync();
            if (item == null) return NotFound();

            return Ok(item);
        }

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

    [HttpGet("plsWork")]
    public async Task<ActionResult<IEnumerable<ItemResponse>>> GetMostItems()
    {
        if (_context.Item == null)
        {
            return NotFound();
        }
        var meme = new ItemResponse
        {
            Name = "can't believe its not butter"
        };
        return Ok(meme);
    }

    // GET: api/Item/5
    [HttpGet("advanced/{searchQuery}")] //TODO fix advanced if we have time. Then Adding request instead of string
    public async Task<ActionResult<Item>> GetItem(string searchUniqueId)
    {
        if (_context.Item == null)
        {
            return NotFound();
        }

        var item = await _context.Item.FirstOrDefaultAsync(i => i.UniqueId == searchUniqueId);

        if (item == null)
        {
            return NotFound();
        }
        return item;
    }

    // PUT: api/Item/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutItem(string uniqueId, PostItemRequest item) //should take request
    {
        if(string.IsNullOrEmpty(uniqueId)) return BadRequest();

        _context.Entry(item).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ItemExists(uniqueId))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult> PostSpecificItem(PostItemRequest item) //should probably take a DTO instead
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



    // DELETE: api/Item/5
    [HttpDelete("user/delete")]
    public async Task<IActionResult> DeleteItem(DeleteItemRequest itemToDelete)
    {
        if (_context.Item == null)
        {
            return NotFound();
        }
        var item = await _context.Item.FirstOrDefaultAsync(e => e.UniqueId == itemToDelete.UniqueId);
        if (item == null)
        {
            return NotFound();
        }

        _context.Item.Remove(item);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    private bool ItemExists(string id)
    {
        return (_context.Item?.Any(e => e.UniqueId == id)).GetValueOrDefault();
    }

    private bool UserExists(string id)
    {
        return (_context.Item?.Any(e => e.UserId == id)).GetValueOrDefault();
    }
}

