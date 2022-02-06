using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Pooling.Model
{
    public class Profile
    {
        public Profile(){
            Personal = new CaptainInfo();
            Habits = new HabitsModel();
        }
        public CaptainInfo Personal { get; set; }
        public VehicleModel Vehicle { get; set; }
        public HabitsModel Habits { get; set; }
       
    }
}
