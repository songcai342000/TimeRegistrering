using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeRegistrering.Data;
using TimeRegistrering.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace TimeRegistrering.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        public static User[] users = new User[]
        {
            new User { UserId=1, UserName="admin@admin.com", Password = "123456aA!", UserType="Admin"},
            new User { UserId=2, UserName="ankit@ankit.com", Password = "123456aA!", UserType="User"}
        };

        [HttpGet]
        [Route("GetUserData")]
        [Authorize(Policy = Policies.User)]
        public async Task<IActionResult> GetUserData()
        {
            await Task.Delay(500);
            return Ok("This is an normal user");
        }

        [HttpGet]
        [Route("GetAdminData")]
        [Authorize(Policy = Policies.Admin)]
        public async Task<IActionResult> GetAdminData()
        {
            await Task.Delay(500);
            return Ok("This is an Admin user");
        }

        [HttpGet]
        [Route("GetUserId/{userName}")]
        public async Task<int> GetUserId(string userName)
        {
            await Task.Delay(500);
            return users.FirstOrDefault(u => u.UserName == userName).UserId;
        }
    }
}
