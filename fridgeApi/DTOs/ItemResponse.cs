using System.ComponentModel.DataAnnotations;
public class ItemResponse
{
    //will need a unique ID to be used by frontend and in database
    public string uniqueId { get; set; } = "";
    public string Name { get; set; } = "";

    [DataType(DataType.Date)]
    [Required]
    public DateTime ExpiryDate { get; set; }
    [Required]
    public int Amount { get; set; }
    [Required]
    public string Measurement { get; set; } = "";
    // public string? Category { get; set; }
    // public string? Location { get; set; }

}