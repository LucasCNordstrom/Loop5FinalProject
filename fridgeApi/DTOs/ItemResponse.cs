using System.ComponentModel.DataAnnotations;
public class ItemResponse
{
  public string Name { get; set; } = "";

  [DataType (DataType.Date)]
  [Required]
  public DateTime ExpiryDate { get; set; }
  [Required]
  public int Amount { get; set; }
  [Required]
  public string Measurement { get; set; } = "";
  // public string? Category { get; set; }
  // public string? Location { get; set; }
  
}