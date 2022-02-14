using Car_Pooling.Model;
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
    public class HomeController : ControllerBase
    {
        private string constring = @"Data Source= DESKTOP-P94RTL3\SQLEXPRESS ; Initial Catalog =CarPooling; Integrated Security = True";
        [HttpPost]
        [Route("updateOfferStatus")]
        async public void updatestatus([FromBody] Offered obj)
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Update OfferedRides set ridestatus = '" + obj.ridestatus + "' where ID='"+obj.Offer_ID+"'";
            SqlCommand cmd = new SqlCommand(query,con);
            cmd.ExecuteNonQuery();
            string query1 = "Update Bookings set status = '" + obj.ridestatus + "' where order_ID='" + obj.Offer_ID + "'";
            SqlCommand cmd1 = new SqlCommand(query1, con);
            cmd1.ExecuteNonQuery();
        }
        [HttpPost]
        [Route("UpdateProfile")]
        async public void updateProfile([FromBody] Profile obj)
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Update Personal set first_name ='" + obj.Personal.firstname + "',last_name='" + obj.Personal.lastname + "',gender='" + obj.Personal.gender + "',cnic='" + obj.Personal.cnic + "',email='" + obj.Personal.email + "',city='" + obj.Personal.city + "',password='" + obj.Personal.password + "',image='" + obj.Personal.image + "' where phone_no = '"+obj.Personal.phoneNo+"'";
            SqlCommand cmd = new SqlCommand(query, con);
            cmd.ExecuteNonQuery();
            string query1 = "Update VehicleInfo set registration_no='" + obj.Vehicle.regno + "',model='"+obj.Vehicle.model+"',maker='"+obj.Vehicle.maker+"',seats = '"+obj.Vehicle.seats+"',color='"+obj.Vehicle.color+ "' where phone_no = '" + obj.Personal.phoneNo + "'";
            SqlCommand cmd1 = new SqlCommand(query1, con);
            cmd1.ExecuteNonQuery();
            string query2 = "Update PersonHabits set Smooker ='" + obj.Habits.smooking + "',Talkative='" + obj.Habits.talkative + "',ListenMusic='" + obj.Habits.music + "' where phone_no = '" + obj.Personal.phoneNo + "'";
            SqlCommand cmd2 = new SqlCommand(query2, con);
            cmd2.ExecuteNonQuery();
            string query3 = "Update HabitsAllowed set AllowSmooker='" + obj.Habits.allowsmooking + "',AllowTalkative='" + obj.Habits.allowtalkative + "',AllowMusic='" + obj.Habits.allowmusic + "' where phone_no = '" + obj.Personal.phoneNo + "'";
            SqlCommand cmd3 = new SqlCommand(query3, con);
            cmd3.ExecuteNonQuery();
        }
        [HttpPost]
        [Route("UpdateUserProfile")]
        async public void updateUserProfile([FromBody] Profile obj)
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Update Personal set first_name ='" + obj.Personal.firstname + "',last_name='" + obj.Personal.lastname + "',gender='" + obj.Personal.gender + "',cnic='" + obj.Personal.cnic + "',email='" + obj.Personal.email + "',city='" + obj.Personal.city + "',password='" + obj.Personal.password + "',image='" + obj.Personal.image + "' where phone_no = '" + obj.Personal.phoneNo + "'";
            SqlCommand cmd = new SqlCommand(query, con);
            cmd.ExecuteNonQuery();
            string query2 = "Update PersonHabits set Smooker ='" + obj.Habits.smooking + "',Talkative='" + obj.Habits.talkative + "',ListenMusic='" + obj.Habits.music + "' where phone_no = '" + obj.Personal.phoneNo + "'";
            SqlCommand cmd2 = new SqlCommand(query2, con);
            cmd2.ExecuteNonQuery();
            string query3 = "Update HabitsAllowed set AllowSmooker='" + obj.Habits.allowsmooking + "',AllowTalkative='" + obj.Habits.allowtalkative + "',AllowMusic='" + obj.Habits.allowmusic + "' where phone_no = '" + obj.Personal.phoneNo + "'";
            SqlCommand cmd3 = new SqlCommand(query3, con);
            cmd3.ExecuteNonQuery();
        }
        [HttpPost]
        [Route("CurrentLocation")]
        async public Task<List<object>> CurrentLocation([FromBody] Offered obj )
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            DateTime d = new DateTime();
            List<object> list = new List<object>();
            string query = "Select order_ID from Bookings where P_ID = '" + obj.phoneNo + "' and book_date >= '" + obj.date + "' order by book_date Asc";
            SqlCommand cmd = new SqlCommand(query,con);
            SqlDataReader sdr = cmd.ExecuteReader();
            if (!sdr.HasRows)
            {
                return list;
            }
            sdr.Read();
            string o_id = sdr["order_ID"].ToString();
            sdr.Close();
            con.Close();
            if (o_id != "")
            {
                con.Open();
                string query1 = "Select route_points from Routes r inner join OfferedRides o on r.route_ID = o.route_ID where o.ID = '" + o_id + "' and o.ridestatus=0";
                SqlCommand cmd1 = new SqlCommand(query1, con);
                SqlDataReader sdr1 = cmd1.ExecuteReader();
                sdr1.Read();
                if (!sdr1.HasRows)
                {
                    return list;
                }
                else
                {
                    string points = sdr1["route_points"].ToString();
                    list.Add(points);
                    sdr1.Close();
                    string query2 = "Select source,destination from Passenger_Route where ride_ID = '" + o_id + "' and phoneNo = '" + obj.phoneNo + "'";
                    SqlCommand cmd2 = new SqlCommand(query2, con);
                    SqlDataReader sdr2 = cmd2.ExecuteReader();
                    sdr2.Read();
                    string source = sdr2["source"].ToString();
                    string destination = sdr2["destination"].ToString();
                    list.Add(source);
                    list.Add(destination);
                    return list;
                }
            }
            else
            return list;
        }
        [HttpGet]
        [Route("GetFare")]
        async public Task<List<FareModel>> GetFare()
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Select * from Settings";
            SqlCommand cmd = new SqlCommand(query, con);
            SqlDataReader sdr =  cmd.ExecuteReader();
            List<FareModel> list = new List<FareModel>();
            FareModel f;
            while (sdr.Read())
            {
                f = new FareModel();
                f.initialfare = (int)sdr["initialFare"];
                f.perKm = (int)sdr["fareperKm"];
                list.Add(f);
            }
            return list;
        }
        [HttpPost]
        [Route("UpdateFare")]
        async public Task<bool> UpdateFare([FromBody] FareModel obj) 
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Update Settings set initialFare = '"+obj.initialfare+"', fareperKm = '"+obj.perKm+"'";
            SqlCommand cmd = new SqlCommand(query, con);
            cmd.ExecuteNonQuery();
            return true;
        }
        [HttpPost]
        [Route("CheckVehicle")]
        async public Task<bool> checkvehicle([FromBody] LoginModel obj)
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Select count(*) as Count from VehicleInfo where phone_no = '" + obj.phone + "'";
            SqlCommand cmd = new SqlCommand(query, con);
            SqlDataReader sdr = cmd.ExecuteReader();
            sdr.Read();
            int c = (int)sdr["Count"];
            if (c == 1)
            {
                return true;
            }
            else
            {
                return false;
            }
            
        }
        [HttpPost]
        [Route("DeleteRoute")]
        async public Task<bool> deleteroute([FromBody] RoutesModel obj)
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Delete from Routes where route_ID = '" + obj.ID + "'";
            SqlCommand cmd = new SqlCommand(query, con);
            cmd.ExecuteNonQuery();
            return true;
        }
    }
}
