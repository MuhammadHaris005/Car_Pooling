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

    public class SearchController : ControllerBase
    {
        private string constring = @"Data Source= DESKTOP-P94RTL3\SQLEXPRESS ; Initial Catalog =CarPooling; Integrated Security = True";
        string extime;
        int a_seats;
        string days;
        string EndDate;
        [HttpPost]
        [Route("MatchRide")]
        async public Task<List<object>> Match([FromBody] UpdateSeats obj)
        {
            List<object> details = new List<object>();

            bool check =  Checkseat(obj.id, obj.P1, obj.P2, obj.seats);
            if (check == true)
            {
                bool check2 = Checkhabits(obj.user_phoneNo, obj.owner_phoneNo);
                if (check2 == true)
                {
                    details = GetOwner(obj.owner_phoneNo);
                    return details;
                }
                return details;
            }
            else
                return details;
        }
        public bool Checkseat(int id, int P1, int P2, int seats)
        {
            List<OfferDays> l = new List<OfferDays>();
            l = GetSeat(id);
            if (l.Count != 0)
            {

                for (int i = P1 + 1; i <= P2; i++)
                {
                    if (l[i].seats_offer >= seats)
                    {
                        extime = l[P1].ex_time;
                        a_seats = l[i].seats_offer;
                        days = l[i].days;
                        EndDate = l[i].endDate;
                    }
                }
                return true;
            }
            else
                return false;
        }
        public List<OfferDays> GetSeat(int Offer_ID)
        {
            List<OfferDays> list = new List<OfferDays>();
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Select point,available_seats,e_time,end_date,days from Driver_Offers d left join OfferedRides o on d.offerride_id = o.ID where offerride_id ='" + Offer_ID + "' and ridestatus !='1'";
            SqlCommand com = new SqlCommand(query, con);
            SqlDataReader sdr = com.ExecuteReader();
            OfferDays r;
            while (sdr.Read())
            {
                r = new OfferDays();
                r.totalpoints = (int)sdr["point"];
                r.seats_offer = (int)sdr["available_seats"];
                r.ex_time = sdr["e_time"].ToString();
                r.endDate = sdr["end_date"].ToString();
                r.days = sdr["days"].ToString();
                list.Add(r);
            }
            con.Close();
            return list;
        }
        public bool Checkhabits(string a, string b)
        {
            List<HabitsModel> list1 = new List<HabitsModel>();
            list1 = GetHabit(a);
            List<HabitsModel> list2 = new List<HabitsModel>();
            list2 = GetHabit(b);
            if (list1[0].smooking == list2[0].allowsmooking && list1[0].music == list2[0].allowmusic && list1[0].talkative == list2[0].allowtalkative &&
             list1[0].allowsmooking == list2[0].smooking && list2[0].music == list1[0].allowmusic && list2[0].talkative == list1[0].allowtalkative)
            {
                return true;
            }
            else
                return false;
        }
        public List<HabitsModel> GetHabit(string phoneNo)
        {
            List<HabitsModel> list = new List<HabitsModel>();
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Select * from HabitsAllowed h Join PersonHabits p on h.phone_no = p.phone_no  where h.phone_no = '" + phoneNo + "'";
            SqlCommand com = new SqlCommand(query, con);
            SqlDataReader sdr = com.ExecuteReader();
            HabitsModel r;
            while (sdr.Read())
            {
                r = new HabitsModel();
                r.music = sdr["ListenMusic"].ToString();
                r.smooking = sdr["Smooker"].ToString();
                r.talkative = sdr["Talkative"].ToString();
                r.allowmusic = sdr["ListenMusic"].ToString();
                r.allowsmooking = sdr["AllowSmooker"].ToString();
                r.allowtalkative = sdr["AllowTalkative"].ToString();
                list.Add(r);
            }
            con.Close();
            return list;
        }
        public List<object> GetOwner(string phoneNo)
        {
            List<object> info = new List<object>();
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            CaptainInfo c;
            //sdr.Close();
            string query1 = "Select * from Personal p inner Join VehicleInfo v on p.phone_no = v.phone_no  where p.phone_no ='" + phoneNo + "'";
            SqlCommand comm = new SqlCommand(query1, con);
            SqlDataReader sdr1 = comm.ExecuteReader();
            VehicleModel v;
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
                c.gender = sdr1["gender"].ToString();
                c.password = sdr1["password"].ToString();
                info.Add(c);
                v = new VehicleModel();
                v.vehicle_ID = (int)sdr1["vehicle_ID"];
                v.regno = sdr1["registration_no"].ToString();
                v.model = sdr1["model"].ToString();
                v.maker = sdr1["maker"].ToString();
                v.color = sdr1["color"].ToString();
                v.AC = sdr1["AC"].ToString();
                v.seats = (Int32)sdr1["seats"];
                info.Add(v);
                info.Add(extime);
                info.Add(a_seats);
                info.Add(days);
                info.Add(EndDate);
            }
            sdr1.Close();
            string query = "Select AVG(score) As Rank from Review where to_ID ='" + phoneNo + "'";
            SqlCommand com = new SqlCommand(query, con);
            SqlDataReader sdr = com.ExecuteReader();
            sdr.Read();
            string a = sdr["Rank"].ToString();
            if (a != "")
            {
                double rank = (double)sdr["Rank"];
                info.Add(rank);
            }
            else
            {
                info.Add(0);
            }
            con.Close();
            return info;
        }
    }
}
