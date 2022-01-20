using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Pooling.Model
{
    public class ReturnBooking
    {

        public ReturnBooking(){
            captianInfo = new CaptainInfo();
            vehicle = new VehicleModel();
            booking = new BookingModel();
            }
        public CaptainInfo captianInfo { get; set; }
        public VehicleModel vehicle { get; set; }
        public BookingModel booking { get; set; }
    }
}
