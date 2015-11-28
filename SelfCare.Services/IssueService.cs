using System;
using System.Collections.Generic;
using System.Linq;
using SelfCare.Data;
using SelfCare.Data.Models;

namespace SelfCare.Services
{
    public class IssueService : IIssueService,IDisposable
    {
        private readonly CareDataContext _dataContext;

        public IssueService(CareDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public IEnumerable<Issue> GetIssues()
        {
            return _dataContext.Issues.All().AsEnumerable();
        }

        public void Dispose()
        {
            _dataContext?.Dispose();
        }
    }
}
