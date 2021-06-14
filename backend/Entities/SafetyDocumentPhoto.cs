namespace backend.Entities
{
    public class SafetyDocumentPhoto
    {
        public int Id { get; set; }
        public string Path { get; set; }
        
        public int SafetyDocumentId { get; set; }
        public SafetyDocument SafetyDocument { get; set; }
    }
}