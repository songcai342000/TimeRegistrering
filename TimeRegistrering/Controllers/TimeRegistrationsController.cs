using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using TimeRegistrering.Models;

namespace TimeRegistrering.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TimeRegistrationsController : ControllerBase
    {
        private readonly ILogger<TimeRegistrationsController> _logger;

        private static List<TimeRegistration> registrations = new List<TimeRegistration>
        {
            new TimeRegistration { RegistrationId=1, UserId=1, ProjectName="ABC Kidgarden Construction", Comment = "This is a test", Hours=1, RegistrationTime=new DateTime(2019, 11, 02, 13, 50, 34)},
            new TimeRegistration { RegistrationId=2, UserId=2, ProjectName="Sunshine Primary School Construction", Comment = "This is a test", Hours=1, RegistrationTime=new DateTime(2019, 11, 03, 13, 50, 34)},
            new TimeRegistration { RegistrationId=3, UserId=2, ProjectName="Sunshine Primary School Construction", Comment = "This is a test", Hours=1, RegistrationTime=new DateTime(2019, 11, 04, 13, 50, 34)},
            new TimeRegistration { RegistrationId=4, UserId=2, ProjectName="Sunshine Primary School Construction", Comment = "This is a test", Hours=2, RegistrationTime=new DateTime(2020, 10, 03, 13, 50, 34)},
            new TimeRegistration { RegistrationId=5, UserId=2, ProjectName="Sunshine Primary School Construction", Comment = "This is a test", Hours=2, RegistrationTime=new DateTime(2020, 10, 04, 13, 50, 34)},
            new TimeRegistration { RegistrationId=6, UserId=2, ProjectName="Sunshine Primary School Construction", Comment = "This is a test", Hours=2, RegistrationTime=new DateTime(2020, 10, 05, 13, 50, 34)},
        };

        public TimeRegistrationsController(ILogger<TimeRegistrationsController> logger)
        {
            _logger = logger;
        }

        [HttpGet("GetTimeRegistrations")]
        public async Task<IEnumerable<TimeRegistration>> GetTimeRegistrations()
        {
            try
            {
                string token = HttpContext.Request.Headers["Authorization"];
                token = token.Replace("Bearer", "").Trim();
                var handler = new JwtSecurityTokenHandler();
                var jwt = (JwtSecurityToken)handler.ReadJwtToken(token);
                var userId = jwt.Claims.First(claim => claim.Type == "userId").Value;
                var role = jwt.Claims.First(claim => claim.Type == "role").Value;
                if (role == "User")
                {
                    var query = from r in registrations
                                where r.UserId == Convert.ToInt32(userId)
                                select r;
                    await Task.Delay(500);
                    return query.ToList();
                }
                else
                {
                    await Task.Delay(500);
                    return registrations.ToList();
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        [HttpGet("GetTimeRegistrationsByProject/{projectName}")]
        public async Task<IEnumerable<TimeRegistration>> GetTimeRegistrationsByProject(string projectName)
        {
            try
            {
                string token = HttpContext.Request.Headers["Authorization"];
                token = token.Replace("Bearer", "").Trim();
                var handler = new JwtSecurityTokenHandler();
                var jwt = (JwtSecurityToken)handler.ReadJwtToken(token);
                var userId = jwt.Claims.First(claim => claim.Type == "userId").Value;
                var role = jwt.Claims.First(claim => claim.Type == "role").Value;
                if (role == "User")
                {
                    var query = from r in registrations
                                where r.UserId == Convert.ToInt32(userId) && r.ProjectName == projectName
                                select r;
                    await Task.Delay(1000);
                    return query.ToList();
                }
                else
                {
                    var query = registrations.Where(r => r.ProjectName == projectName);
                    await Task.Delay(1000);
                    return query.ToList();
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        [HttpGet("GetTimeRegistrationsByProjectAndDate/{projectName}/{date}")]
        public async Task<IEnumerable<TimeRegistration>> GetTimeRegistrationsByProjectAndDate(string projectName, string date)
        {
            try
            {
                string token = HttpContext.Request.Headers["Authorization"];
                token = token.Replace("Bearer", "").Trim();
                var handler = new JwtSecurityTokenHandler();
                var jwt = (JwtSecurityToken)handler.ReadJwtToken(token);
                var userId = jwt.Claims.First(claim => claim.Type == "userId").Value;
                var role = jwt.Claims.First(claim => claim.Type == "role").Value;

                if (role == "User")
                {
                    var query = from r in registrations
                                where r.UserId == Convert.ToInt32(userId) && r.ProjectName == projectName && r.RegistrationTime == DateTime.Parse(date)
                                select r;
                    await Task.Delay(1000);
                    return query.ToList();
                }
                else
                {
                    var query = registrations.Where(r => r.ProjectName == projectName && r.RegistrationTime == DateTime.Parse(date));
                    await Task.Delay(1000);
                    return query.ToList();
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }


        [HttpGet("GetTimeRegistrationsByDate/{date}")]
        public async Task<IEnumerable<TimeRegistration>> GetTimeRegistrationsByDate(string date)
        {
            try
            {
                string token = HttpContext.Request.Headers["Authorization"];
                token = token.Replace("Bearer", "").Trim();
                var handler = new JwtSecurityTokenHandler();
                var jwt = (JwtSecurityToken)handler.ReadJwtToken(token);
                var userId = jwt.Claims.First(claim => claim.Type == "userId").Value;
                var role = jwt.Claims.First(claim => claim.Type == "role").Value;
                if (role == "User")
                {
                    var query = from r in registrations
                                where r.UserId == Convert.ToInt32(userId) && r.RegistrationTime == DateTime.Parse(date)
                                select r;
                    await Task.Delay(1000);
                    return query.ToList();
                }
                else
                {
                    var query = registrations.Where(r => r.RegistrationTime == DateTime.Parse(date));
                    await Task.Delay(1000);
                    return query.ToList();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        [HttpGet("GetTimeRegistration")]
        public async Task<ActionResult<TimeRegistration>> GetTimeRegistration(int id)
        {
            try
            {
                var registration = registrations.Last();
                await Task.Delay(1000);
                if (registration == null)
                {
                    return NotFound();
                }
                else
                {
                    return registration;
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        [HttpPost]
        public async Task<ActionResult<TimeRegistration>> AddRegistration(TimeRegistration registration)
        {
            try
            {
                var registrationId = registrations.Last().RegistrationId;
                registration.RegistrationId = registrationId;
                registrations.Add(registration);
                await Task.Delay(1000);
                return NoContent();
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        [HttpDelete]
        public async Task<ActionResult<TimeRegistration>> DeleteRegistration(int id)
        {
            try
            {
                var registration = registrations.Find(r => r.RegistrationId == id);
                registrations.Remove(registration);
                await Task.Delay(1000);
                return Ok();
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

    }
}
