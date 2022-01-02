using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Pooling.Model
{
    public class OfferDays : Offered
    {
        public string days { get; set; }
        public string[] e_time { get; set; }
        public int totalpoints { get; set; }
        public string ex_time { get; set; }

    }
}
