using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController:BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth_test")]
        public ActionResult<string> GetSecret(){
            return "Secret text";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound(){
            var notFoundUser = _context.Users.Find(-1);
            if (notFoundUser==null) return new NotFoundResult();
            return new OkResult();  
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError(){
            //try
            //{
                var notFoundUser = _context.Users.Find(-1);
                return notFoundUser.ToString();  
            //}
            //catch{
            //    return new StatusCodeResult(500);
            //}
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest(){
            return new BadRequestResult();  
        }


    }
}