using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TimeRegistrering.Data;
using TimeRegistrering.Models;

namespace TimeRegistrering.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogInController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ILogger<LogInController> _logger;

        private List<User> appUsers = new List<User>
        {
            new User {  UserName = "admin@admin.com", Password = "123456aA!", UserType = "Admin" },
            new User {  UserName = "ankit@ankit.com", Password = "123456aA!", UserType = "User" }
        };

        public LogInController(IConfiguration config, ILogger<LogInController> logger)
        {
            _config = config;
            _logger = logger;
        }

        [HttpPost]
        public IActionResult Login([FromBody] User login)
        {
            try
            {
                IActionResult response = Unauthorized();
                User user = AuthenticateUser(login);
                if (user != null)
                {
                    var tokenString = GenerateJWT(user);
                    response = Ok(new
                    {
                        token = tokenString,
                        userDetails = user,
                    });
                }
                return response;
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        User AuthenticateUser(User loginCredentials)
        {
            User user = UserController.users.SingleOrDefault(x => x.UserName == loginCredentials.UserName && x.Password == loginCredentials.Password);
            return user;
        }

        string GenerateJWT(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.UserName),
                new Claim("userId", userInfo.UserId.ToString()),
                new Claim("role",userInfo.UserType),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
