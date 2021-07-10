using backend.Entities;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Data.Repo
{
    public class ConsumerRepository : IConsumerRepository
    {
        private readonly DataContext dc;

        public ConsumerRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void AddCustomer(Customer customer)
        {
            dc.Customers.AddAsync(customer);
        }

        public void DeleteCustomer(Customer customer)
        {
            dc.Customers.Remove(customer);
        }

        public async Task<Customer> FindCustomer(int id)
        {
            return await dc.Customers.FindAsync(id);
        }

        public async Task<IEnumerable<Customer>> GetCustomerAsync()
        {
            return await dc.Customers.ToListAsync();
        }

        public async Task<Customer> GetCustomerByIdAsync(int id)
        {
            return await dc.Customers.FindAsync(id);
        }

        public async Task<IEnumerable<Customer>> GetCustomersByLocationAsync(string location)
        {
            return await dc.Customers
                .Where(x => x.Location == location)
                .ToListAsync();
        }

        public void Update(Customer customer)
        {
            dc.Entry(customer).State = EntityState.Modified;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }
    }
}
