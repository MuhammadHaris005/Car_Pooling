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
            string query = "Update OfferedRides set status = '" + obj.ridestatus + "' where ID='"+obj.Offer_ID+"'";
            SqlCommand cmd = new SqlCommand(query,con);
            cmd.ExecuteNonQuery();
        }
        //async public Task<List<BookingModel>>
        [HttpPost]
        [Route("UpdateProfile")]
        async public void updateProfile([FromBody] Profile obj)
        {
            SqlConnection con = new SqlConnection(constring);
            con.Open();
            string query = "Update Personal set values ='" + obj.Personal.firstname + "','" + obj.Personal.lastname + "','" + obj.Personal.gender + "','" + obj.Personal.cnic + "','" + obj.Personal.email + "','" + obj.Personal.city + "','" + obj.Personal.password + "','" + obj.Personal.image + "'";
            SqlCommand cmd = new SqlCommand(query, con);
            cmd.ExecuteNonQuery();
        }
    }
}
