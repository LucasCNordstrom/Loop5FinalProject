using System.ComponentModel.DataAnnotations;
public class Item
{

    public int Id { get; set; }
    [Required]
    public string Name { get; set; } = "";
    public string UniqueId { get; set; }
    [Required]
    public string UserId { get; set; }

    [DataType(DataType.Date)]
    [Required]
    public DateTime ExpiryDate { get; set; }
    [Required]
    public int Amount { get; set; }
    [Required]
    public string Measurement { get; set; } = "";
    public string? Category { get; set; }
    public string Location { get; set; } = "";

}