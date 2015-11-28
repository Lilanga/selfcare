using SelfCare.Data.Repository;

namespace SelfCare.Data
{
    public interface ICareDataContext : IUnitOfWork
    {
        IIssueRepository Issues { get; }
        ICategoryRepository Categories { get; }
        IProductRepository Products { get; }
    }
}