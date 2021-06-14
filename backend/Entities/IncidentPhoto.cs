namespace backend.Entities
{
    public class IncidentPhoto
    {
        public int Id { get; set; }
        public string Path { get; set; }
        
        public int IncidentId { get; set; }
        public Incident Incident { get; set; }
    }
}