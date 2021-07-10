using AutoMapper;
using backend.DTOs;
using backend.Entities;
using backend.Helpers;
using backend.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    public class CrewController : BaseApiController
    {
        private readonly ICrewRepository crewRepository;
        private readonly IMapper mapper;

        private readonly UserManager<User> _userManager;
        private readonly IUnitOfWork _unitOfWork;

        public CrewController(IUnitOfWork unitOfWork, ICrewRepository crewRepository, IMapper mapper, UserManager<User> userManager)
        {
            this.crewRepository = crewRepository;
            this.mapper = mapper;
            _userManager = userManager;
            _unitOfWork = unitOfWork;
        }

        [HttpPost("{username}")]
        public async Task<ActionResult<CrewDto>> CreateCrew(CreateCrewDto createCrewDto, string username)
        {
            var crew = mapper.Map<Crew>(createCrewDto);
            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == username);
            crewRepository.AddCrew(crew);

            if (await crewRepository.SaveAllAsync())
            {
                await _unitOfWork.NotificationRepository.NewNotification(new Notification()
                {
                    Type = "Success",
                    Content = "You added new crew named: " + crew.Name,
                    DateTimeCreated = DateTime.Now,
                }, temp.Id);

                return Ok(mapper.Map<CrewDto>(crew));
            }

            return BadRequest("Failed to add crew");
        }

        [HttpDelete("{id}/{username}")]
        public async Task<ActionResult> DeleteCrew(int id, string username)
        {
            var crew = await crewRepository.GetCrewByIdAsync(id);
            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == username);

            ICollection<User> users = new List<User>();

            foreach (var item in _userManager.Users)
            {
                if (item.CrewId == id)
                {
                    item.CrewId = null;
                    users.Add(item);
                }
            }

            foreach (var item in users)
            {
                await _userManager.UpdateAsync(item);
            }

            crewRepository.DeleteCrew(crew);

            if (await crewRepository.SaveAllAsync())
            {
                await _unitOfWork.NotificationRepository.NewNotification(new Notification()
                {
                    Type = "Info",
                    Content = "You deleted crew: " + crew.Name,
                    DateTimeCreated = DateTime.Now,
                }, temp.Id);

                return Ok();
            }

            return BadRequest("Problem with deleting crew");
        }

        [HttpPut("{username}")]
        public async Task<ActionResult> UpdateCrew(CrewDto crewDto, string username)
        {
            var crew = await crewRepository.GetCrewByIdAsync(crewDto.Id);
            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == username);

            mapper.Map(crewDto, crew);

            crewRepository.UpdateCrew(crew);

            if (await crewRepository.SaveAllAsync())
            {
                await _unitOfWork.NotificationRepository.NewNotification(new Notification()
                {
                    Type = "Success",
                    Content = "You updated crew: " + crew.Name,
                    DateTimeCreated = DateTime.Now,
                }, temp.Id);

                return NoContent();
            }

            return BadRequest("Failed to update crew");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CrewDto>>> GetCrews()
        {
            var crews = await crewRepository.GetCrewsAsync();

            var finalCrews = mapper.Map<List<CrewDto>>(crews);

            return Ok(finalCrews);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CrewDto>> GetCrew(int id)
        {
            var crew = await crewRepository.GetCrewByIdAsync(id);

            return Ok(mapper.Map<CrewDto>(crew));
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Crew>>> GetCrewsSearch([FromQuery] CrewSearchParameters crewSearch)
        {
            var crews = await crewRepository.GetCrewsAsync();

            if (!String.IsNullOrWhiteSpace(crewSearch.Name))
                crews = crews.Where(c => c.Name.ToLower().Contains(crewSearch.Name.Trim().ToLower()));

            var finalCrews = mapper.Map<List<CrewDto>>(crews);

            return Ok(finalCrews);
        }
    }
}
