using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Pooling.Model
{
    public class reviewModel
    {
        public string from_ID { get; set; }
        public string to_ID { get; set; }
        public double score { get; set; } 
        public int booking_id { get; set; }
    }
}
