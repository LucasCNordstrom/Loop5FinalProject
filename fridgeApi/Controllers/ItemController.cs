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
                Name ="Milk",
                ExpiryDate = DateTime.Today.AddMonths(1),
                Amount = 5,
                Measurement = "Litres"
            },
            new ItemResponse{
                Name ="Honey",
                ExpiryDate = DateTime.Today.AddMonths(11),
                Amount = 3,
                Measurement = "Kilo"
            },
            new ItemResponse{
                Name ="Meat",
                ExpiryDate = DateTime.Today.AddDays(4),
                Amount = 500,
                Measurement = "Gram"
            }
        };
        return Ok(itemResponses);
    }

    // GET: api/Item
    [HttpGet("All")]
    public async Task<ActionResult<IEnumerable<ItemResponse>>> GetAllItems(string? searchQuery)
    {
        try
        {
            if (_context.Item == null)
        {
            return NotFound();
        }
        
        if(!string.IsNullOrEmpty(searchQuery)) 
        {
            var item = await _context.Item.Where<Item>(i => i.Name.Contains(searchQuery)).ToListAsync();
            if(item == null) return NotFound();
            
            return Ok(item);
        }

        return Ok(await (from item in _context.Item
                let newItem = new ItemResponse
                {
                    Name = item.Name,
                    ExpiryDate = item.ExpiryDate,
                    Amount = item.Amount,
                    Measurement = item.Measurement
                }
                select newItem).ToListAsync());
        }
        catch (System.Exception error)
        {
            Console.WriteLine(error.ToString());
            _logger.LogError(0, error, "Error while processing request from Http get");
            throw;
        }
        
    }

    [HttpGet("plsWork")]
    public async Task<ActionResult<IEnumerable<ItemResponse>>> GetMostItems()
    {
        if (_context.Item == null)
        {
            return NotFound();
        }
        var meme = new ItemResponse {
            Name = "can't believe its not butter"
        };
        return Ok(meme);
    }

    // GET: api/Item/5
    [HttpGet("advanced/{searchQuery}")] //TODO fix advanced if we have time. Then Adding request instead of string
    public async Task<ActionResult<Item>> GetItem(string searchQuery)
    {
        if (_context.Item == null)
        {
            return NotFound();
        }

        var item = await _context.Item.FirstOrDefaultAsync(i => i.Name.Contains(searchQuery));

        if (item == null)
        {
            return NotFound();
        }
        return item;
    }

    // PUT: api/Item/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutItem(int id, Item item) //should take request
    {
        if (id != item.Id)
        {
            return BadRequest();
        }

        _context.Entry(item).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ItemExists(id))
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

    // POST: api/Item
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost("PostItem")]
    public async Task<ActionResult> PostItem(ItemPostRequest itemRequest) //should probably take a DTO instead
    {
        var newItem = new Item {
            Name = itemRequest.Name,
            ExpiryDate = itemRequest.ExpiryDate,
            Amount = itemRequest.Amount,
            Measurement = itemRequest.Measurement,
            Category = itemRequest.Category,
            Location = itemRequest.Location
        };
        if(_context == null || _context.Item == null) return NotFound();

        await _context.Item.AddAsync(newItem);

        await _context.SaveChangesAsync();
        
        return Ok(newItem);
    }



    // DELETE: api/Item/5
    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> DeleteItem(int id) //name 
    {
        if (_context.Item == null)
        {
            return NotFound();
        }
        var item = await _context.Item.FindAsync(id);
        if (item == null)
        {
            return NotFound();
        }

        _context.Item.Remove(item);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ItemExists(int id)
    {
        return (_context.Item?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}

