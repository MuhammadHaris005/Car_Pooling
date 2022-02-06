using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Pooling.Model
{
    public class BookingModel
    {
        public int ID { get; set; }
        public string d_phone { get; set; }
        public string u_phone { get; set; }
        public int vehicle_ID { get; set; }
        public int seats { get; set; }
        public int order_id { get; set; }
        public DateTime book_date { get; set; }
        public DateTime till_date { get; set; }
        public string book_days { get; set; }
        public int status { get; set; }
        public int s_point { get; set; }
        public int e_point { get; set; }
        public string exp_time { get; set;}
    }
}
