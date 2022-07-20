using System.ComponentModel.DataAnnotations;
public class DeleteItemRequest
{
    [Required]
    public string UniqueId {get; set;}
}