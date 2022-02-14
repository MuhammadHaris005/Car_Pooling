using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Pooling.Model
{
    public class PassengerRouteModel
    {
        public string source { get; set; }
        public string destination { get; set; }
        public int ride_ID { get; set; }
        public string phoneNo { get; set; } 
    }
}
