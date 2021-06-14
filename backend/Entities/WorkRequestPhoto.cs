namespace backend.Entities
{
    public class WorkRequestPhoto
    {
        public int Id { get; set; }
        public string Path { get; set; }
        
        public int WorkRequestId { get; set; }
        public WorkRequest WorkRequest { get; set; }
    }
}