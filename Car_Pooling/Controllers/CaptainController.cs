using Car_Pooling.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Pooling.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CaptainController : ControllerBase
    {
        private string constring = @"Data Source= DESKTOP-P94RTL3\SQLEXPRESS ; Initial Catalog =CarPooling; Integrated Security = True";
        [HttpPost]
        [Route("General")]
        public bool General([FromBody] CaptainInfo captain)
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "insert into Personal values('" + captain.phoneNo + "','" + captain.firstname + "','" + captain.lastname + "','" + captain.gender + "','" + captain.cnic + "','" + captain.email + "','" + captain.city + "','" + captain.password + "','" + captain.confirmPassword + "','" + captain.role + "','" + captain.image+"')";
            SqlCommand com = new SqlCommand(query, con);
            com.ExecuteNonQuery();
            return true;
        }
        [HttpPost]
        [Route("Vehicle")]
        public bool Vehicle([FromBody] VehicleModel vehicle)
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "insert into VehicleInfo values('"+ vehicle.regno + "','" + vehicle.model + "','" + vehicle.maker + "','" + vehicle.seats + "','" + vehicle.color + "','" + vehicle.phoneNo+ "')";
            SqlCommand com = new SqlCommand(query, con);
            com.ExecuteNonQuery();
            return true;
        }
        [HttpPost]
        [Route("Habits")]
        public bool Habits([FromBody] HabitsModel habits)
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "insert into PersonHabits values('" + habits.smooking + "','" + habits.talkative + "','" + habits.music + "' ,'" + habits.phoneNo + "')";
            SqlCommand com = new SqlCommand(query, con);
            com.ExecuteNonQuery();
            string query2= "insert into HabitsAllowed values('" + habits.allowsmooking + "','" + habits.allowtalkative + "','" + habits.allowmusic + "','" + habits.phoneNo + "')";
            SqlCommand com1 = new SqlCommand(query2, con);
            com1.ExecuteNonQuery();
            return true;        
        }
        [HttpPost]
        [Route("Routes")]
        public bool Routes([FromBody] RoutesModel route)
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "insert into Routes values('" + route.mappoints + "','" + route.source + "','" + route.destination + "','" + route.phoneNo + "','"+route.status+"')";
            SqlCommand com = new SqlCommand(query, con);
            com.ExecuteNonQuery();
            return true;
        }
        [HttpPost]
        [Route("Login")]
        public List<CaptainInfo> Login([FromBody] LoginModel obj)
        {
            List<CaptainInfo> info = new List<CaptainInfo>();
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = string.Format("Select * from Personal where phone_no = {0} and password='{1}'", obj.phone, obj.password);
            SqlCommand com = new SqlCommand(query, con);
            SqlDataReader sdr = com.ExecuteReader();
            CaptainInfo c;
            while (sdr.Read())
            {
                c = new CaptainInfo();
                c.firstname = sdr["first_name"].ToString();
                c.lastname = sdr["last_name"].ToString();
                c.email = sdr["email"].ToString();
                c.cnic = sdr["cnic"].ToString();
                c.phoneNo = sdr["phone_no"].ToString();
                c.city = sdr["city"].ToString();
                c.role = sdr["role"].ToString();
                c.image = sdr["image"].ToString();
                info.Add(c);
            }
            if (info.Count == 0)
            {
                return null;
            }
            else
                return info;
        }
        [HttpPost]
        [Route("GetPoints")]
        public List<object> GetPoints([FromBody] CaptainInfo obj)
        {
            
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "select route_ID,route_points,source,destination,status,seats from Routes JOIN VehicleInfo ON Routes.phone_no = VehicleInfo.phone_no where Routes.phone_no= '" + obj.phoneNo+"'" ;
            SqlCommand com = new SqlCommand(query, con);
            SqlDataReader sdr = com.ExecuteReader();
            List<object> list = new List<object>();
            Driver p;
            while (sdr.Read())
            {
                p = new Driver();
                p.ID = (Int32)sdr["route_ID"];
                p.mappoints = sdr["route_points"].ToString();
                p.source = sdr["source"].ToString();
                p.destination = sdr["destination"].ToString();
                p.status = (bool)sdr["status"];
                p.seats = (int)sdr["seats"];
                list.Add(p);
            }
            return list;
        }
        [HttpGet]
        [Route("GetRides")]
        public List<RoutesModel> Rides()
        {
            List<RoutesModel> list = new List<RoutesModel>();
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Select * from Routes";
            SqlCommand com = new SqlCommand(query, con);
            SqlDataReader sdr = com.ExecuteReader();
            RoutesModel r;
            while (sdr.Read())
            {
                r = new RoutesModel();
                r.mappoints = sdr["route_points"].ToString();
                r.phoneNo = sdr["phone_no"].ToString();
                r.phoneNo = sdr["phone_no"].ToString();
                r.status = (bool)sdr["Status"];
                list.Add(r);
            }
             return list;
        }
        [HttpPost]
        [Route("GetCaptain")]
        public List<object> GetCaptain([FromBody] CaptainInfo obj)
        {
            List<object> info = new List<object>();
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            //string query = string.Format("Select * from Personal where phone_no = {0}", obj.phoneNo);
            //SqlCommand com = new SqlCommand(query, con);
            //SqlDataReader sdr = com.ExecuteReader();
            CaptainInfo c;
            
            //sdr.Close();
            string query1 = "Select * from Personal p inner Join VehicleInfo v on p.phone_no = v.phone_no inner Join PersonHabits h on p.phone_no =  h.phone_no inner Join HabitsAllowed a on p.phone_no =  a.phone_no where p.phone_no ='" + obj.phoneNo+"'";
            SqlCommand comm = new SqlCommand(query1, con);
            SqlDataReader sdr1 = comm.ExecuteReader();
            
            VehicleModel v;
            HabitsModel h;
            while (sdr1.Read())
            {
                c = new CaptainInfo();
                c.image = sdr1["image"].ToString();
                c.firstname = sdr1["first_name"].ToString();
                c.lastname = sdr1["last_name"].ToString();
                c.email = sdr1["email"].ToString();
                c.cnic = sdr1["cnic"].ToString();
                c.city = sdr1["city"].ToString();
                c.role = sdr1["role"].ToString();
                c.phoneNo = sdr1["phone_no"].ToString();
                info.Add(c);
                v = new VehicleModel();
                v.vehicle_ID = (int)sdr1["vehicle_ID"];
                v.regno = sdr1["registration_no"].ToString();
                v.model = sdr1["model"].ToString();
                v.maker = sdr1["maker"].ToString();
                v.color = sdr1["color"].ToString();
                v.seats = (Int32)sdr1["seats"];
                info.Add(v);
                h = new HabitsModel();
                h.music = (bool)sdr1["ListenMusic"];
                h.smooking = (bool)sdr1["Smooker"];
                h.talkative = (bool)sdr1["Talkative"];
                h.allowmusic = (bool)sdr1["ListenMusic"];
                h.allowsmooking = (bool)sdr1["AllowSmooker"];
                h.allowtalkative = (bool)sdr1["AllowTalkative"];
                info.Add(h);
            }
            return info;
        }
        [HttpPost]
        [Route("UpdateTime")]
        public bool UpdateTime([FromBody] RoutesModel obj)
        
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Update Routes set start_time= '" +  "' where phone_no = '"+obj.phoneNo+"' and route_ID='"+obj.ID+"'";
            SqlCommand com = new SqlCommand(query, con);
            com.ExecuteNonQuery();
            return true;
        }
        [HttpPost]
        [Route("UpdateSeats")]
        public bool UpdateSeats([FromBody] UpdateSeats obj)

        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            for(int i = obj.P1; i <= obj.P2; i++)
            {
                string query = "Update Driver_Offers set available_seats= available_seats- '" + obj.seats + "' where offerride_id = '" + obj.id + "' and point = '"+i+"'";
                SqlCommand com = new SqlCommand(query, con);
                com.ExecuteNonQuery();
            }
            return true;
        }
        [HttpPost]
        [Route("Booking")]
        public bool Booking([FromBody] BookingModel obj) 
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Insert into Bookings values ('" + obj.d_phone + "','" + obj.u_phone + "','" + obj.vehicle_ID + "','" + obj.order_id + "','" + obj.seats + "')";
            SqlCommand cmd = new SqlCommand(query, con);
            cmd.ExecuteNonQuery();
            return true;
        }
        [HttpPost]
        [Route("GetBookings")]
        public List<ReturnBooking> GetBookings([FromBody] BookingModel obj)
        {

            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "select first_name,last_name,image,book_seats,registration_no,model,order_ID from Personal p Join Bookings b on p.phone_no = b.D_ID inner join VehicleInfo v on v.vehicle_ID = b.vehicle_ID where b.P_ID = '" + obj.u_phone + "'";
            SqlCommand com = new SqlCommand(query, con);
            SqlDataReader sdr = com.ExecuteReader();
            List<ReturnBooking> list = new List<ReturnBooking>();
            ReturnBooking p;
            
            while (sdr.Read())
            {
                p = new ReturnBooking();
                p.c.firstname = sdr["first_name"].ToString();
                p.c.lastname = sdr["last_name"].ToString();
                p.b.seats =  (int)sdr["book_seats"];
                p.b.order_id = (int)sdr["order_ID"];
                p.v.regno = sdr["registration_no"].ToString();
                p.v.model = sdr["model"].ToString();
                list.Add(p);
            }
            return list;
        }
        [HttpPost]
        [Route("UpdateStatus")]
        public bool Update([FromBody] RoutesModel obj)
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query1 = "update Routes set status = 'false' where phone_no = '" + obj.phoneNo + "' and status = 'true'";
            string query = "update Routes set status = '" + obj.status + "' where phone_no = '" + obj.phoneNo + "' and route_ID='" + obj.ID + "'";
            SqlCommand com = new SqlCommand(query1, con);
            com.ExecuteNonQuery();
            SqlCommand com1 = new SqlCommand(query, con);
            com1.ExecuteNonQuery();   
            return true;
        }
        [HttpPost]
        [Route("Offer")]
        public bool Offer([FromBody] OfferDays obj)
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "insert into OfferedRides values('" + obj.route_ID + "','" + obj.type + "','" + obj.seats_offer + "','" + obj.date + "','" + obj.s_time + "','" + obj.r_time + "','"+obj.days+"' )";
            SqlCommand com = new SqlCommand(query, con);
            com.ExecuteNonQuery();
            string query2 = "Select MAX(ID) AS ID from OfferedRides";
            SqlCommand cmd1 = new SqlCommand(query2, con);
            SqlDataReader sdr = cmd1.ExecuteReader();
            int result=-1;
            while (sdr.Read())
            {
                result = (int)sdr["ID"];
            }
            sdr.Close();
            
            for (int i= 0; i< obj.totalpoints; i++)
            {
                string query1 = "insert into Driver_Offers values('" + i + "','" + obj.seats_offer + "','"+result+"','"+obj.e_time[i]+"')";
                SqlCommand cmd = new SqlCommand(query1, con);
                cmd.ExecuteNonQuery();
            }
            return true;
        }
        [HttpPost]
        [Route("Searching")]
        public List<RoutesModel> SearchingRides([FromBody] Offered obj)
        {
            List<RoutesModel> list = new List<RoutesModel>();
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Select route_points,status,phone_no,ID,days from Routes INNER JOIN OfferedRides ON Routes.route_ID=OfferedRides.route_ID WHERE OfferedRides.type='"+obj.type+"' and date >= '"+obj.date+"'";
            SqlCommand com = new SqlCommand(query, con);
            SqlDataReader sdr = com.ExecuteReader();
            OfferDays r;
            while (sdr.Read())
            {
                r = new OfferDays();
                r.ID = (int)sdr["ID"];
                r.mappoints = sdr["route_points"].ToString();
                r.phoneNo = sdr["phone_no"].ToString();
                r.status = (bool)sdr["status"];
                r.days = sdr["days"].ToString();
                list.Add(r);
            }
            con.Close();
            
            return list;
        }
        [HttpPost]
        [Route("GetHabits")]
        public List<HabitsModel> GetHabits([FromBody] HabitsModel obj)
        {
            List<HabitsModel> list = new List<HabitsModel>();
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Select * from HabitsAllowed h Join PersonHabits p on h.phone_no = p.phone_no  where h.phone_no = '"+obj.phoneNo+"'";
            SqlCommand com = new SqlCommand(query, con);
            SqlDataReader sdr = com.ExecuteReader();
            HabitsModel r;
            while (sdr.Read())
            {
                r = new HabitsModel();
                r.music = (bool)sdr["ListenMusic"];
                r.smooking = (bool)sdr["Smooker"];
                r.talkative = (bool)sdr["Talkative"];
                r.allowmusic = (bool)sdr["ListenMusic"];
                r.allowsmooking = (bool)sdr["AllowSmooker"];
                r.allowtalkative = (bool)sdr["AllowTalkative"];
                list.Add(r);
            }
            return list;
        }
        [HttpPost]
        [Route("GetSeats")]
        public List<OfferDays> GetSeats([FromBody] Offered obj)
        {
            List<OfferDays> list = new List<OfferDays>();
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Select * from Driver_Offers where offerride_id = '" + obj.Offer_ID + "'";
            SqlCommand com = new SqlCommand(query, con);
            SqlDataReader sdr = com.ExecuteReader();
            OfferDays r;
            while (sdr.Read())
            {
                r = new OfferDays();
                r.totalpoints = (int)sdr["point"];
                r.seats_offer = (int)sdr["available_seats"];
                r.ex_time = sdr["e_time"].ToString();
                list.Add(r);
            }
            return list;
        }
        [HttpPost]
        [Route("GetOfferRides")]
        public List<Offered> GetOfferRides([FromBody] Offered obj)
        {
            List<Offered> list = new List<Offered>();
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Select * from OfferedRides o Join Routes r on o.route_ID = r.route_ID where o.route_ID='" + obj.route_ID + "'";
            SqlCommand com = new SqlCommand(query, con);
            SqlDataReader sdr = com.ExecuteReader();
            Offered r;
            while (sdr.Read())
            {
                r = new Offered();
                r.ID = (int)sdr["ID"];
                r.type = sdr["type"].ToString();
                r.seats_offer = (int)sdr["seats_offer"];
                r.s_time = (DateTime)sdr["start_time"];
                r.source = sdr["source"].ToString();
                r.destination = sdr["destination"].ToString();
                r.date = (DateTime)sdr["date"];
                list.Add(r);
            }
            return list;
        }
        [HttpPost]
        [Route("DeleteRide")]
        public  bool DeleteRide([FromBody] Offered obj)
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query1 = "Delete from OfferedRides where OfferedRides.ID ='" + obj.Offer_ID + "'";
            SqlCommand cmd1 = new SqlCommand(query1, con);
            int res1 = cmd1.ExecuteNonQuery();
            if (res1 > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }
}
