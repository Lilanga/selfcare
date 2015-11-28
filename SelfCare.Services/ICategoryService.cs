using System.Collections.Generic;
using SelfCare.Data.Models;

namespace SelfCare.Services
{
    public interface ICategoryService
    {
        IEnumerable<Category> GetCategories();

        IEnumerable<string> GetCategoryNames();
    }
}