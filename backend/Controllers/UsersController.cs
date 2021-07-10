using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using backend.DTOs;
using backend.Entities;
using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    //[Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;

        private readonly UserManager<User> _userManager;

        public UsersController(IUserRepository userRepository, IMapper mapper, UserManager<User> userManager)
        {
            this.userRepository = userRepository;
            this.mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet("crewMembers/{id}")]
        public async Task<ActionResult<IEnumerable<CrewMemberDto>>> GetUsers(int id)
        {
            var users = await userRepository.GetUsersAsync(id);

            var finalUsers = mapper.Map<List<CrewMemberDto>>(users);

            return Ok(finalUsers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CrewMemberDto>> GetUsersById(int id)
        {
            var user = await userRepository.GetUserByIdAsync(id);

            return Ok(mapper.Map<CrewMemberDto>(user));
        }

        [HttpGet("crew/{id}")]
        public async Task<ActionResult<IEnumerable<CrewMemberDto>>> GetUsersByCrewId(int id)
        {
            var users = await userRepository.GetUsersByCrewIdAsync(id);

            var finalUsers = mapper.Map<List<CrewMemberDto>>(users);

            return Ok(finalUsers);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateCrewMember(CrewChangeMemberDto crewChangeMemberDto)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.Id == crewChangeMemberDto.Id);
            if (user.CrewId == null)
            {
                user.CrewId = crewChangeMemberDto.CrewId;
            }
            else
            {
                user.CrewId = null;
            }

            await _userManager.UpdateAsync(user);
            userRepository.UpdateUser(user);

            if (await userRepository.SaveAllAsync())
                return NoContent();

            return BadRequest("Failed to update crew");
        }
    }
}