using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.DTOs;
using backend.Entities;
using backend.Helpers;
using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class DeviceController : BaseApiController
    {
        private readonly IDeviceRepository _deviceRepository;
        private readonly IMapper _mapper;
        public DeviceController(IDeviceRepository deviceRepository, IMapper mapper)
        {
            _mapper = mapper;
            _deviceRepository = deviceRepository;
        }

        [HttpPost]
        public async Task<ActionResult<DeviceDto>> CreateDevice(CreateDeviceDto createDeviceDto)
        {
            var device = _mapper.Map<Device>(createDeviceDto);
            _deviceRepository.AddDevice(device);

             if (await _deviceRepository.SaveAllAsync()) return Ok(_mapper.Map<DeviceDto>(device));

            return BadRequest("Failed to add device");

            
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Device>>> GetDevices()
        {
            var devices = await _deviceRepository.GetDevicesAsync();

            var finalDevices = _mapper.Map<List<DeviceDto>>(devices);

            return Ok(finalDevices);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Device>>> GetDevicesSearch([FromQuery]DeviceSearchParameters deviceParams)
        {
            var devices = await _deviceRepository.GetDevicesAsync();
            
            if (!String.IsNullOrWhiteSpace(deviceParams.Type))
                devices = devices.Where(d => d.Type.ToLower().Contains(deviceParams.Type.Trim().ToLower()));
            if (!String.IsNullOrWhiteSpace(deviceParams.Name))
                devices = devices.Where(d => d.Name.ToLower().Contains(deviceParams.Name.Trim().ToLower()));
            if (!String.IsNullOrWhiteSpace(deviceParams.Address))
                devices = devices.Where(d => d.Address.ToLower().Contains(deviceParams.Address.Trim().ToLower()));

            if (deviceParams.Latitude != null)
                devices = devices.Where(d => d.Latitude == deviceParams.Latitude);

            if (deviceParams.Longitude != null)
                devices = devices.Where(d => d.Longitude == deviceParams.Longitude);

            var finalDevices = _mapper.Map<List<DeviceDto>>(devices);

            return Ok(finalDevices);
        }        

        [HttpGet("{id}")]
        public async Task<ActionResult<DeviceDto>> GetDevice(int id)
        {
            var device = await _deviceRepository.GetDeviceByIdAsync(id);

            return Ok(_mapper.Map<DeviceDto>(device));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateDevice(DeviceUpdateDto deviceUpdateDto)
        {
            var device = await _deviceRepository.GetDeviceByIdAsync(deviceUpdateDto.Id);

            _mapper.Map(deviceUpdateDto, device);

            _deviceRepository.Update(device);

            if (await _deviceRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update device");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDevice(int id)
        {
            var device = await _deviceRepository.GetDeviceByIdAsync(id);

            _deviceRepository.DeleteDevice(device);

            if (await _deviceRepository.SaveAllAsync()) return Ok();

            return BadRequest("Problem with deleting device");
        }
    }
}