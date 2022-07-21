using Xunit;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using fridgeApi.Controllers;
using Microsoft.Data.Sqlite;
using System.Data.Common;
using System;
using System.Linq;

namespace fridgeApi.Tests;

public class ItemControllerTests : IDisposable
{

    private readonly DbConnection _connection;
    private readonly DbContextOptions<ItemContext> _options;
    public ItemControllerTests()
    {
        _connection = new SqliteConnection("Filename=:memory");
        _connection.Open();

        _options = new DbContextOptionsBuilder<ItemContext>()
            .UseSqlite(_connection)
            .Options;
        SeedDatabase();
    }

    public void SeedDatabase()
    {
        using (var context = new ItemContext(_options))
        {
            context.Database.EnsureCreated();
            context.Item.AddRange
            (
                SpecificParameters.uniqueItem,
                SpecificParameters.anotherUniqueItem,
                SpecificParameters.thirdUniqueItem,
                SpecificParameters.forthUniqueItem,
                SpecificParameters.fifthUniqueItem
            );
            context.SaveChanges();
        }
    }

    public void Dispose()
    {
        _connection.Close();
        _connection.Dispose();
    }

    [Fact]
    public async Task get_all_items_should_return_all()
    {
        using var context = new ItemContext(_options);

        var controller = new ItemController(context);
        var allItems = await controller.GetEveryItemInDb();
        var value = allItems.Value.ToList();
        Assert.Equal(5, value.Count);
    }

    [Fact]
    public async Task get_all_items_byId_should_return_their_items()
    {
        using var context = new ItemContext(_options);

        var controller = new ItemController(context);
        var allItems = await controller.GetAllItemsForUser(SpecificParameters.UserId);
        var value = allItems.Value.ToList();
        Assert.Equal(2, value.Count);
    }

    [Fact]
    public async Task get_specific_item()
    {
        using var context = new ItemContext(_options);

        var controller = new ItemController(context);
        var item = await controller.GetSpecificItem(SpecificParameters.specificItemId);
        var value = item.Value;
        Assert.Equal("Meat", value.Name);
        Assert.Equal(5, value.Amount);
        Assert.Equal("Litres", value.Measurement);
    }
}