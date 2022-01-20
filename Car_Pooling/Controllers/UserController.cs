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
    public class UserController : Controller
    {
        private string constring = @"Data Source= DESKTOP-P94RTL3\SQLEXPRESS ; Initial Catalog =CarPooling; Integrated Security = True";
        [HttpPost]
        [Route("GiveReview")]
        public bool review([FromBody] reviewModel reviewModel)
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "insert into Review values('"+reviewModel.from_ID+"','"+reviewModel.score+ "','" + reviewModel.booking_id + "')";
            SqlCommand cmd = new SqlCommand(query, con);
            cmd.ExecuteNonQuery();
            return true;
        }
        [HttpPost]
        [Route("UpdateBookSeats")]
        public bool UpdateBookSeats([FromBody] UpdateSeats obj)
        {

            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query0 = "Delete from Bookings where ID='" + obj.booking_id + "'";
            SqlCommand cmd0 = new SqlCommand(query0, con);
            cmd0.ExecuteNonQuery();
            for (int i = obj.P1; i <= obj.P2; i++)
            {
                string query = "Update Driver_Offers set available_seats= available_seats+ '" + obj.seats + "' where offerride_id = '" + obj.id + "' and point = '" + i + "'";
                SqlCommand com = new SqlCommand(query, con);
                com.ExecuteNonQuery();
            }
            con.Close();
            return true;
        }
        [HttpPost]
        [Route("SendNotification")]
        public async Task<bool> SendNotification([FromBody] NotificationModel obj)
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Insert into Notification values('" + obj.sender + "','" + obj.reciever + "','" + obj.message + "',0)";
            SqlCommand cmd = new SqlCommand(query, con);
            cmd.ExecuteNonQuery();
            return true;
        }
        [HttpPost]
        [Route("GetNotifications")]
        public async Task<List<NotificationModel>> GetNotification([FromBody] NotificationModel obj)
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Select Message,first_name,last_name from Notification inner join Personal on Notification.Sender_id = Personal.phone_no where Reciever_id='" + obj.reciever + "'";
            SqlCommand cmd = new SqlCommand(query,con);
            SqlDataReader sdr =  cmd.ExecuteReader();
            List<NotificationModel> list = new List<NotificationModel>();
            NotificationModel n;
            while (sdr.Read())
            {
                n = new NotificationModel();
                n.message = sdr["Message"].ToString();
                list.Add(n);
            }
            return list;
        }

        [HttpPost]
        [Route("GetPerson")]
        async public Task<List<Profile>> GetProfile([FromBody] LoginModel obj)
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "select * from Personal p inner join VehicleInfo v on p.phone_no = v.phone_no inner join HabitsAllowed ha on p.phone_no = ha.phone_no inner join PersonHabits ph on p.phone_no = ph.phone_no where p.phone_no ='"+obj.phone+"'";
            SqlCommand cmd = new SqlCommand(query,con);
            SqlDataReader sdr = cmd.ExecuteReader();
            List<Profile> list = new List<Profile>();
            Profile p;
            while (sdr.Read())
            {
                p = new Profile();
                p.Personal.image = sdr["image"].ToString();
                p.Personal.firstname = sdr["first_name"].ToString();
                p.Personal.lastname = sdr["last_name"].ToString();
                p.Personal.email = sdr["email"].ToString();
                p.Personal.cnic = sdr["cnic"].ToString();
                p.Personal.city = sdr["city"].ToString();
                p.Personal.role = sdr["role"].ToString();
                
                p.Vehicle.regno = sdr["registration_no"].ToString();
                p.Vehicle.model = sdr["model"].ToString();
                p.Vehicle.maker = sdr["maker"].ToString();
                p.Vehicle.color = sdr["color"].ToString();
                p.Vehicle.seats = (Int32)sdr["seats"];

            }
            return list;
        }
    }
    
}
