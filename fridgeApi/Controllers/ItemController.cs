using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Azure.Storage.Blobs;

namespace fridgeApi.Controllers;

[Route("Items")]
[ApiController]
public class ItemController : ControllerBase
{
    private readonly ItemContext _context;
    private readonly IConfiguration _config;
    BlobContainerClient containerClient;

    public ItemController(ItemContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }


    // GET: api/Item
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Item>>> GetItem()
    {
        var items = new List<Item> {
                new Item {
                    Id = 1,
                    Name = "Milk",
                    ExpiryDate = DateTime.Today,
                    Amount = 1,
                    Measurement = "Litre"
                },
                new Item {
                    Id = 2,
                    Name = "Eggs",
                    ExpiryDate = DateTime.Today,
                    Amount = 12,
                    Measurement = "quantity"
                },
                new Item {
                    Id = 3,
                    Name = "Flour",
                    ExpiryDate = DateTime.Today,
                    Amount = 2,
                    Measurement = "Kilos"
                }
            };
        if (_context.Item == null)
        {
            return NotFound();
        }
        //return await _context.Item.ToListAsync();
        return items;
    }

    // GET: api/Item/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Item>> GetItem(int id)
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
        return item;
    }

    // PUT: api/Item/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutItem(int id, Item item)
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
    [HttpPost("postItem")]
    public async Task<ActionResult> PostItem(Item item)
    {
        await _context.Item.AddAsync(item);
        await _context.SaveChangesAsync();
        
        return Ok();
    }



    // DELETE: api/Item/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteItem(int id)
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

