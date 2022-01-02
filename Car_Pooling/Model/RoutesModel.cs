using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Pooling.Model
{
    public class RoutesModel
    {
        public int ID { get; set; }
        public string mappoints { get; set; }
        public string source { get; set; }
        public string destination { get; set; }
        public string phoneNo { get; set; } 
        public bool status {get; set;}
    }
}
