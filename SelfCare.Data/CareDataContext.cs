using System;
using SelfCare.Data.Repository;

namespace SelfCare.Data
{
    public class CareDataContext : ICareDataContext
    {
        private readonly DataContext _dataContext;
        private IIssueRepository _issues;
        private ICategoryRepository _categories;
        private IProductRepository _products;

        public CareDataContext()
        {
            _dataContext = DataContext.Create();
        }

        public IIssueRepository Issues => _issues ?? (_issues = new IssueRepository(_dataContext));

        public ICategoryRepository Categories => _categories ?? (_categories = new CategoryRepository(_dataContext));

        public IProductRepository Products => _products ?? (_products = new ProductRepostiroy(_dataContext));

        public int SaveChanges()
        {
            return _dataContext.SaveChanges();
        }

        public void Dispose()
        {
            _issues?.Dispose();
            _categories?.Dispose();
            _products?.Dispose();
            _dataContext?.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
