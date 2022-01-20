using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Pooling.Model
{
    public class UpdateSeats : SearchingModel 
    {
        public int id { get; set; }
        public int booking_id { get; set; }
        public int P1 { get; set; }
        public int P2 { get; set; }
        public int seats { get; set; }
    }
}
