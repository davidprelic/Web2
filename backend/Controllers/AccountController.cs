using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.Entities;
using backend.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService, IMapper mapper)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == username.ToLower());
            EditProfileDto retval = new EditProfileDto()
            {
                FirstName = temp.FirstName,
                LastName = temp.LastName,
                UserName = temp.UserName,
                Email = temp.Email,
                UserRole = temp.UserRole,
                Address = temp.Address,
                DateOfBirth = temp.DateOfBirth
            };
            return Ok(new { retval });
        }

        [HttpPut("EditProfile")]
        public async Task<IActionResult> EditProfile(EditProfileDto editProfileDto)
        {
            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == editProfileDto.UserName.ToLower());
            temp.FirstName = editProfileDto.FirstName;
            temp.LastName = editProfileDto.LastName;
            temp.UserName = editProfileDto.UserName;
            temp.Email = editProfileDto.Email;
            temp.DateOfBirth = editProfileDto.DateOfBirth;
            temp.Address = editProfileDto.Address;
            if(temp.UserRole != editProfileDto.UserRole)
            {
                if(editProfileDto.UserRole != "CrewMember")
                {
                    temp.CrewId = null;
                }

                temp.UserRole = editProfileDto.UserRole;
                temp.RegistrationStatus = "Waiting";
            }
            await _userManager.UpdateAsync(temp);
            if (!string.IsNullOrWhiteSpace(editProfileDto.OldPassword))
            {
                if((await _userManager.ChangePasswordAsync(temp, editProfileDto.OldPassword, editProfileDto.NewPassword)).Succeeded)
                {
                    return Ok(new { msg = "changedpass" });
                }
                else
                {
                    return BadRequest(new { msg = "err" });
                }
            }
            return Ok(new { msg = "ok" });
        
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Email)) return BadRequest("Email is taken");

            var user = _mapper.Map<User>(registerDto);

            user.Email = registerDto.Email.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, registerDto.UserRole);

            if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);

            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
            .SingleOrDefaultAsync(x => x.Email == loginDto.Email.ToLower());

            if (user == null) return Unauthorized("Invalid email");

            var result = await _signInManager
                .CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized();

            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string email)
        {
            return await _userManager.Users.AnyAsync(x => x.Email == email.ToLower());
        }


    }
}