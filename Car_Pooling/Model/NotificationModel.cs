using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Pooling.Model
{
    public class NotificationModel : CaptainInfo
    {
        public string sender { get; set; }
        public string reciever { get; set; }
        public string message { get; set; }
    }
}
