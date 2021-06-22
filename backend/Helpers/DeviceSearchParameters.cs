namespace backend.Helpers
{
    public class DeviceSearchParameters
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }
}