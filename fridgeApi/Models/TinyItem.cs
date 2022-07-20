using System.ComponentModel.DataAnnotations;
public class TinyItem
{
    [Required]
    public string Name { get; set; } = "";
    [Required]
    public DateTime ExpiryDate { get; set; }
    [Required]
    public int Amount { get; set; }

    [Required]
    public string Unit { get; set; }
    [Required]
    public string UserId { get; set; }

}