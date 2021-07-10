using AutoMapper;
using backend.DTOs;
using backend.Entities;
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

    public class NotificationUsersController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public NotificationUsersController(UserManager<User> usermanager, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _userManager = usermanager;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<IEnumerable<NotificationUser>>> GetNotificationUsers(string username)
        {
            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == username.ToLower());
            var notifications = _unitOfWork.NotificationRepository.GetNotifications();
            var notificationUsers = _unitOfWork.NotificationUserRepository.GetNotificationUsersForOneUser(temp.Id);
            List<NotificationDto> retList = new List<NotificationDto>();

            foreach (var notificationUser in notificationUsers)
            {
                if (notificationUser.UserId == temp.Id)
                {
                    Notification not = notifications.FirstOrDefault(x => x.Id == notificationUser.NotificationId);

                    retList.Add(new NotificationDto()
                    {
                        Id = notificationUser.NotificationId,
                        Content = not.Content,
                        Type = not.Type,
                        DateTimeCreated = not.DateTimeCreated,
                        Read = notificationUser.Read
                    });;
                }
            }

            return Ok(retList);
        }

        [HttpPut]
        public async Task<ActionResult> ChangeNotificationToRead(ChangeToReadDto changeToReadDto)
        {
            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == changeToReadDto.Username.ToLower());

            var notUser = _unitOfWork.NotificationUserRepository.GetNotificationUserByIdAsync(temp.Id, changeToReadDto.Id);

            if(notUser.Read == false)
            {
                notUser.Read = true;
                _unitOfWork.NotificationUserRepository.Update(notUser);
                if (await _unitOfWork.SaveAsync()) return Ok();

                return BadRequest("Failed to change to read work plan");
            }
            else
            {
                return BadRequest("Notification already read");
            }
        }

    }
}
