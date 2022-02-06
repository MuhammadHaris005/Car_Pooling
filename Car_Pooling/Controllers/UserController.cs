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
            string query = "insert into Review values('"+reviewModel.from_ID+ "','" + reviewModel.to_ID + "','" + reviewModel.score+ "','" + reviewModel.booking_id + "')";
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
            string query = "Select Message,first_name,last_name from Notification inner join Personal on Notification.Sender_id = Personal.phone_no where Reciever_id='" + obj.reciever + "' and isRead=0";
            SqlCommand cmd = new SqlCommand(query,con);
            SqlDataReader sdr =  cmd.ExecuteReader();
            List<NotificationModel> list = new List<NotificationModel>();
            NotificationModel n;
            while (sdr.Read())
            {
                n = new NotificationModel();
                n.message = sdr["Message"].ToString();
                n.firstname = sdr["first_name"].ToString();
                n.lastname = sdr["last_name"].ToString();
                list.Add(n);
            }
            return list;
        }
        [HttpPost]
        [Route("GetProfile")]
        async public Task<List<Profile>> GetProfile([FromBody] LoginModel obj)
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "select * from Personal p inner join HabitsAllowed ha on p.phone_no = ha.phone_no inner join PersonHabits ph on p.phone_no = ph.phone_no where p.phone_no ='"+obj.phone+"'";
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
                p.Personal.gender = sdr["gender"].ToString();
                p.Personal.password = sdr["password"].ToString();
                p.Habits.music = sdr["ListenMusic"].ToString();
                p.Habits.smooking = sdr["Smooker"].ToString();
                p.Habits.talkative = sdr["Talkative"].ToString();
                p.Habits.allowmusic = sdr["AllowMusic"].ToString();
                p.Habits.allowsmooking = sdr["AllowSmooker"].ToString();
                p.Habits.allowtalkative = sdr["AllowTalkative"].ToString();
                list.Add(p);
            }
            return list;
        }
        [HttpPost]
        [Route("GetBookRides")]
        async public Task<List<Object>> GetBookedrides([FromBody] BookingModel obj)
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Select * from Bookings b  inner Join Personal p on b.P_ID = p.phone_no where b.order_ID = '"+obj.order_id+"'";
            SqlCommand cmd = new SqlCommand(query, con);
            SqlDataReader sdr = cmd.ExecuteReader();
            List<Object> list = new List<Object>();
            while (sdr.Read())
            {
                ReturnBooking p = new ReturnBooking();
                p.captianInfo.firstname = sdr["first_name"].ToString();
                p.captianInfo.lastname = sdr["last_name"].ToString();
                p.captianInfo.image = sdr["image"].ToString();
                p.booking.ID = (int)sdr["ID"];
                p.booking.seats = (int)sdr["book_seats"];
                p.booking.order_id = (int)sdr["order_ID"];
                p.booking.s_point = (byte)sdr["start_point"];
                p.booking.e_point = (byte)sdr["end_point"];
                p.booking.book_date = (DateTime)sdr["book_date"];
                p.booking.till_date = (DateTime)sdr["till_date"];
                p.booking.book_days = sdr["booked_days"].ToString();
                p.booking.exp_time = sdr["exp_time"].ToString();
                list.Add(p);
            }
            return list;
        }
        [HttpPost]
        [Route("UpdateNotify")]
        async public void UpdateNotify([FromBody] NotificationModel obj)
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Update Notification set isRead = 1 where Reciever_id='" + obj.reciever + "'";
            SqlCommand cmd = new SqlCommand(query, con);
            cmd.ExecuteNonQuery();
        }
    }
    
}
