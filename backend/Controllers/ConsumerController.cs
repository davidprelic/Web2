using AutoMapper;
using backend.Dtos;
using backend.Entities;
using backend.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    public class ConsumerController : BaseApiController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public ConsumerController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var consumers = await uow.ConsumerRepository.GetCustomerAsync();
            var consumersDto = mapper.Map<IEnumerable<ConsumerDto>>(consumers);
            return Ok(consumersDto);
        }

        [HttpPost("addConsumer")]
        public async Task<IActionResult> AddConsumer(ConsumerDto consumerDto)
        {
            var consumer = mapper.Map<Customer>(consumerDto);
            //namesti latitude i longitude na vrednosti koje zavise od lokacije
            consumer.Latitude = 1;
            consumer.Longitude = 1;

            uow.ConsumerRepository.AddCustomer(consumer);
            await uow.SaveAsync();
            return Ok(consumer);
        }

        [HttpPut("updateConsumer/{id}")]
        public async Task<IActionResult> UpdateConsumer(int id, ConsumerDto consumerDto)
        {
            var consFromDb = await uow.ConsumerRepository.FindCustomer(id);
            consFromDb.Latitude = 1;
            consFromDb.Longitude = 1;

            mapper.Map(consumerDto, consFromDb);
            await uow.SaveAsync();
            //Promeni kod ako se lose promenio
            return StatusCode(200);
        }

        [HttpDelete("deleteConsumer")]
        public async Task<IActionResult> DeleteConsumer(int id)
        {
            uow.ConsumerRepository.DeleteCustomer(id);
            await uow.SaveAsync();
            return Ok(id);
        }
    }
}
