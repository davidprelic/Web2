namespace backend.Entities
{
    public class Call
    {
        public int Id { get; set; }
        public string Reason { get; set; }
        public string Comment { get; set; }
        public string Hazard { get; set; }
        public string Email { get; set; }
        public string Location { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        
        public int? CustomerId { get; set; }
        public Customer Customer { get; set; }

        public int? IncidentId { get; set; }
        public Incident Incident { get; set; }
    }
}