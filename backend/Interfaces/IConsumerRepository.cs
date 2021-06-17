using backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IConsumerRepository
    {
        Task<IEnumerable<Customer>> GetCustomerAsync();

        void AddCustomer(Customer customer);

        void DeleteCustomer(int CustomerId);

        Task<Customer> FindCustomer(int id);
    }
}
