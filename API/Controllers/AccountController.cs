using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using System.Security.Cryptography;
using System.Text;
using API.DTOs;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;

namespace API.Controllers
{

    public class AccountController : BaseApiController
    {
        public DataContext _context { get; }
        private readonly ITokenService _tokenService;

        public AccountController(DataContext dataContext, ITokenService tokenService)
        {
            _context = dataContext;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<TokenizedUserDTO>> Register(RegisterDTO registerDTO)
        {
            if (await UserExists(registerDTO.UserName)) return BadRequest("UserName is taken");

            using var hmac = new HMACSHA512();
            var user = new AppUser{
                UserName = registerDTO.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
                PasswordSalt = hmac.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return new TokenizedUserDTO{
                UserName = registerDTO.UserName,
                Token = _tokenService.CreateToken(user)
            };

        }

         [HttpPost("login")]
         public async Task<ActionResult<TokenizedUserDTO>> Login(LoginDTO loginDTO)
         {
            var user = await GetUser(loginDTO.UserName);
            if (user==null) return Unauthorized("Invalid user name");
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));
            for (int i=0; i<computedHash.Length; i++)
                if (computedHash[i]!=user.PasswordHash[i])
                    return Unauthorized("Password doesn't match");
            return new TokenizedUserDTO{
                UserName = loginDTO.UserName,
                Token = _tokenService.CreateToken(user)
            };
         }


        private async Task<bool> UserExists(string userName){
            return await _context.Users.AnyAsync(x=>x.UserName==userName.ToLower());   //FindAsync(UserName.ToLower())==null?false:true;
        }

        private async Task<AppUser> GetUser(string userName){
            return await _context.Users.SingleOrDefaultAsync<AppUser>(x=>x.UserName == userName.ToLower());
        }
    }
}