using System;
using System.Collections.Generic;
using System.Linq;
using SelfCare.Data;
using SelfCare.Data.Models;

namespace SelfCare.Services
{
    public class CategoryService : ICategoryService, IDisposable
    {
        private readonly CareDataContext _dataContext;

        public CategoryService(CareDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public IEnumerable<Category> GetCategories()
        {
            return _dataContext.Categories.All().AsEnumerable();
        }

        public IEnumerable<string> GetCategoryNames()
        {
            var categories = GetCategories();
            return categories.Select(x => x.Name);
        }

        public void Dispose()
        {
            _dataContext?.Dispose();
        }
    }
}
