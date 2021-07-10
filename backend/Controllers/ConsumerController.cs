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
    public class ConsumerController : BaseApiController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly UserManager<User> _userManager;

        public ConsumerController(UserManager<User> userManager, IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetAsync()
        {
            var consumers = await uow.ConsumerRepository.GetCustomerAsync();
            var consumersDto = mapper.Map<IEnumerable<ConsumerDto>>(consumers);
            return Ok(consumersDto);
        }

        [HttpPost("{username}")]
        public async Task<IActionResult> AddConsumer(CreateConsumerDto consumerDto, string username)
        {
            var consumer = mapper.Map<Customer>(consumerDto);
            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == username);

            uow.ConsumerRepository.AddCustomer(consumer);


            if (await uow.SaveAsync())
            {
                await uow.NotificationRepository.NewNotification(new Notification()
                {
                    Type = "Success",
                    Content = "You created new consumer named " + consumerDto.Name + " " + consumerDto.LastName,
                    DateTimeCreated = DateTime.Now,
                }, temp.Id);

                return Ok();
            }
            return BadRequest("Failed to add consumer");
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Customer>>> GetConsumerSearch([FromQuery] ConsumerSearchParameters consumerParameters) 
        {
            var consumers = await uow.ConsumerRepository.GetCustomerAsync();

            if (!String.IsNullOrEmpty(consumerParameters.Type))
                consumers = consumers.Where(c => c.Type.ToLower().Contains(consumerParameters.Type.Trim().ToLower()));
            if (!String.IsNullOrWhiteSpace(consumerParameters.Name))
                consumers = consumers.Where(c => c.Name.ToLower().Contains(consumerParameters.Name.Trim().ToLower()));
            if (!String.IsNullOrWhiteSpace(consumerParameters.LastName))
                consumers = consumers.Where(c => c.LastName.ToLower().Contains(consumerParameters.LastName.Trim().ToLower()));
            if (!String.IsNullOrWhiteSpace(consumerParameters.Location))
                consumers = consumers.Where(c => c.Location.ToLower().Contains(consumerParameters.Location.Trim().ToLower()));
            if (!String.IsNullOrWhiteSpace(consumerParameters.PhoneNumber))
                consumers = consumers.Where(c => c.PhoneNumber.ToLower().Contains(consumerParameters.PhoneNumber.Trim().ToLower()));

            if (consumerParameters.Latitude != null)
                consumers = consumers.Where(c => c.Latitude == consumerParameters.Latitude);

            if (consumerParameters.Longitude != null)
                consumers = consumers.Where(c => c.Longitude == consumerParameters.Longitude);

            if (consumerParameters.Priority != null)
                consumers = consumers.Where(c => c.Priority == consumerParameters.Priority);

            var finalConsumer = mapper.Map<List<ConsumerDto>>(consumers);

            return Ok(finalConsumer);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ConsumerDto>> GetConsumer(int id)
        {
            var consumer = await uow.ConsumerRepository.GetCustomerByIdAsync(id);

            return Ok(mapper.Map<ConsumerDto>(consumer));
        }

        [HttpPut("{username}")]
        public async Task<IActionResult> UpdateConsumer(ConsumerDto consumerDto, string username)
        {
            var consumer = await uow.ConsumerRepository.GetCustomerByIdAsync(consumerDto.Id);
            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == username);

            mapper.Map(consumerDto, consumer);

            uow.ConsumerRepository.Update(consumer);

            if (await uow.SaveAsync())
            {
                await uow.NotificationRepository.NewNotification(new Notification()
                {
                    Type = "Success",
                    Content = "You changed consumer: " + consumerDto.Name + " " + consumerDto.LastName,
                    DateTimeCreated = DateTime.Now,
                }, temp.Id);

                return NoContent();
            }


            return BadRequest("Failed to update consumer");

        }

        [HttpDelete("{id}/{username}")]
        public async Task<IActionResult> DeleteConsumer(int id, string username)
        {
            var consumer = await uow.ConsumerRepository.GetCustomerByIdAsync(id);
            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == username);

            string name = consumer.Name + " "+ consumer.LastName;

            uow.ConsumerRepository.DeleteCustomer(consumer);

            if (await uow.SaveAsync())
            {
                await uow.NotificationRepository.NewNotification(new Notification()
                {
                    Type = "Info",
                    Content = "You deleted consumer: " + name,
                    DateTimeCreated = DateTime.Now,
                }, temp.Id);
                return Ok();
            }

            return BadRequest("Failed to delete consumer");
        }
    }
}
