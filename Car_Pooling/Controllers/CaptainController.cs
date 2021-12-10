using CarPooling.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace CarPooling.Controllers
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
            string query = "insert into PersonalInfo values('" + captain.phoneNo + "','" + captain.firstname + "','" + captain.lastname + "','" + captain.gender + "','" + captain.cnic + "','" + captain.email + "','" + captain.city + "','" + captain.password + "','" + captain.confirmPassword + "','" + captain.role + "','" + captain.image+"')";
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
        [Route("Routes")]
        public bool Routes([FromBody] RoutesModel route)
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "insert into Routes values('" + route.mappoints + "','" + route.phoneNo + "','"+route.stime+"','inactive')";
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
                info.Add(c);
            }
            if (info == null)
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
            string query = "select route_points,status from Routes where phone_no = '"+obj.phoneNo+"'" ;
            SqlCommand com = new SqlCommand(query, con);
            SqlDataReader sdr = com.ExecuteReader();
            List<object> list = new List<object>();
            RoutesModel p;
            while (sdr.Read())
            {
                p = new RoutesModel();
                p.mappoints = sdr["route_points"].ToString();
                p.status = sdr["status"].ToString();
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
                r.mappoints = sdr["mappoints"].ToString();
                r.phoneNo = sdr["phone"].ToString();
                r.phoneNo = sdr["phone"].ToString();
                r.stime = sdr["start_time"].ToString();
                r.status = sdr["Status"].ToString();
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
            string query = string.Format("Select * from CaptainInfo where phone_no = {0} ", obj.phoneNo);
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
                c.city = sdr["city"].ToString();
                c.role = sdr["role"].ToString();
                c.phoneNo = sdr["phone_no"].ToString();
                info.Add(c);
            }
            sdr.Close();
            string query1 = "Select * from VehicleInfo where phone= '"+obj.phoneNo+"'";
            SqlCommand comm = new SqlCommand(query1, con);
            SqlDataReader sdr1 = comm.ExecuteReader();
            
            VehicleModel v;
            while (sdr1.Read())
            {
                v = new VehicleModel();
                v.regno = sdr1["vehicle_regno"].ToString();
                v.model = sdr1["vehicle_model"].ToString();
                v.maker = sdr1["vehicle_company"].ToString();
                v.color = sdr1["vehicle_color"].ToString();
                v.seats = (Int32)sdr1["vehicle_seats"];
                info.Add(v);
            }
            return info;
        }
        [HttpPost]
        [Route("UpdateTime")]
        public bool UpdateTime([FromBody] RoutesModel obj)
        
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Update Routes set start_time= '" + obj.stime + "' where phone = '"+obj.phoneNo+"'";
            SqlCommand com = new SqlCommand(query, con);
            com.ExecuteNonQuery();
            return true;
        }
        [HttpPost]
        [Route("UpdateSeats")]
        public bool UpdateSeats([FromBody] VehicleModel obj)

        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Update VehicleInfo set vehicle_seats= '" + obj.seats + "' where phone = '" + obj.phoneNo + "'";
            SqlCommand com = new SqlCommand(query, con);
            com.ExecuteNonQuery();
            return true;
        }
        [HttpPost]
        [Route("Booking")]
        public bool Booking([FromBody] BookingModel obj) 
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Insert into Bookings values ('" + obj.name + "','" + obj.time + "','" + obj.seats + "','" + obj.u_phone + "')";
            SqlCommand cmd = new SqlCommand(query, con);
            cmd.ExecuteNonQuery();
            return true;
        }
        [HttpPost]
        [Route("GetBookings")]
        public List<object> GetBookings([FromBody] BookingModel obj)
        {

            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "select * from Bookings where phone = '" + obj.u_phone + "'";
            SqlCommand com = new SqlCommand(query, con);
            SqlDataReader sdr = com.ExecuteReader();
            List<object> list = new List<object>();
            BookingModel p;
            while (sdr.Read())
            {
                p = new BookingModel();
                p.name = sdr["D_Name"].ToString();
                p.time = sdr["Time"].ToString();
                p.seats =  (Int32)sdr["Seats"];
                list.Add(p);
            }
            return list;
        }

    }
}
