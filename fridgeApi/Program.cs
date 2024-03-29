using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.AzureAppServices;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ItemContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Azure_Connectionstring") ?? throw new InvalidOperationException("Connection string 'ItemContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000", "https://purple-grass-03d55a510.1.azurestaticapps.net"));

//TODO not any method and this will be changed later I HOPE

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
