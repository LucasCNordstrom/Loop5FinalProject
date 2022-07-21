 public static class SpecificParameters 
    {
        public static string UserId = "A UserId";
        public static string anotherUserId = "Another UserId";
        public static string specificItemId = "Item 1";
        public static string anotherSpecificItemId = "Item 2";

        public static Item uniqueItem = new Item
        {
            Name = "Milk",
            ExpiryDate = System.DateTime.Today.AddDays(5),
            UniqueId = "This items uniqueId",
            UserId = "Milk's userId",
            Amount = 5,
            Measurement = "Litres"
        };

        public static Item anotherUniqueItem = new Item
        {
            Name = "Pasta",
            ExpiryDate = System.DateTime.Today.AddDays(5),
            UniqueId = "Another items uniqueId",
            UserId = UserId,
            Amount = 5,
            Measurement = "Litres"
        };

        public static Item thirdUniqueItem = new Item
        {
            Name = "Meat",
            ExpiryDate = System.DateTime.Today.AddDays(12),
            UniqueId = specificItemId,
            UserId = UserId,
            Amount = 5,
            Measurement = "Litres"
        };

        public static Item forthUniqueItem = new Item
        {
            Name = "Fish",
            ExpiryDate = System.DateTime.Today.AddDays(3),
            UniqueId = anotherSpecificItemId,
            UserId = "Fish's users Id",
            Amount = 5,
            Measurement = "Litres"
        };

        public static Item fifthUniqueItem = new Item
        {
            Name = "Cheese",
            ExpiryDate = System.DateTime.Today.AddDays(999),
            UniqueId = "specific things id",
            UserId = anotherUserId,
            Amount = 5,
            Measurement = "Litres"
        };
    }