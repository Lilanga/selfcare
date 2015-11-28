using System;

namespace SelfCare.Data
{
    public interface IUnitOfWork : IDisposable
    {
        int SaveChanges();
    }
}