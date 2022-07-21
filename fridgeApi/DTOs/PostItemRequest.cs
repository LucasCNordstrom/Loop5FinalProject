using System.ComponentModel.DataAnnotations;
public class PostItemRequest
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

    public string UniqueId {get; set;}

    public string Location { get; set; }

}