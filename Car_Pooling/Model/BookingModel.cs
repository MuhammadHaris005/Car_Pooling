using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Pooling.Model
{
    public class BookingModel 
    {
       
        public string d_phone { get; set; }
        public string u_phone { get; set; }
        public int vehicle_ID { get; set; }
        public int seats { get; set; }
        public int order_id { get; set; }
    }
}
