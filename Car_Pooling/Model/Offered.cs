using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Pooling.Model
{
    public class Offered : RoutesModel
    {
        public int Offer_ID { get; set; }
        public int route_ID { get; set; }
        public string type { get; set; }
        public int seats_offer { get; set; }
        public string date { get; set; }
        public string endDate { get; set; }
        public DateTime s_time { get; set; }
        public string r_time { get; set; }
        public double distance { get; set; }
        public int ridestatus { get; set; }

    }
}
