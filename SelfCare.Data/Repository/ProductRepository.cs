using System;
using SelfCare.Data.Models;

namespace SelfCare.Data.Repository
{
    public class ProductRepostiroy : Repository<Product>, IProductRepository
    {
        public ProductRepostiroy(DataContext dataContext) : base(dataContext) { }
    }
}