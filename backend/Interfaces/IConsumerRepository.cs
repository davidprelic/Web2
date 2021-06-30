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

        Task<Customer> GetCustomerByIdAsync(int id);

        void Update(Customer customer);

        void AddCustomer(Customer customer);

        void DeleteCustomer(Customer customer);

        Task<Customer> FindCustomer(int id);
    }
}
