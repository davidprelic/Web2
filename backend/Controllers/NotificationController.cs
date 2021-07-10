using AutoMapper;
using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    public class NotificationController : BaseApiController
    {
        private readonly object _unitOfWork;
        private readonly object _mapper;

        public NotificationController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

    }
}
