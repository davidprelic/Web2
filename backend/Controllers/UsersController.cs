using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        public UsersController()
        {
           
        }
        
    }
}