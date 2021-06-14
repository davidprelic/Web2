namespace backend.Entities
{
    public class Resolution
    {
        public int Id { get; set; }
        public string Cause { get; set; }
        public string Subcause { get; set; }
        public string ConstructionType { get; set; }
        public string Material { get; set; }

        public Incident Incident { get; set; }
    }
}