using SelfCare.Data.Models;

namespace SelfCare.Data.Repository
{
    /// <summary>
    /// Category repository
    /// </summary>
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="CategoryRepository"/> class.
        /// </summary>
        /// <param name="dataContext"></param>
        public CategoryRepository(DataContext dataContext) : base(dataContext)
        {
        }
    }
}
