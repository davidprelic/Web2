using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Helpers
{
    public class ConsumerSearchParameters
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Type { get; set; }
        public string Location { get; set; }
        public int? Priority { get; set; }
        public string PhoneNumber { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }
}
