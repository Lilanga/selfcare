using System;
using SelfCare.Data.Models;

namespace SelfCare.Data.Repository
{
    public class IssueRepository : Repository<Issue>, IIssueRepository
    {
        public IssueRepository(DataContext dataContext) : base(dataContext) { }
    }
}
