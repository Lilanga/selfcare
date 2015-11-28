using System.Collections.Generic;
using SelfCare.Data.Models;

namespace SelfCare.Services
{
    public interface IIssueService
    {
        IEnumerable<Issue> GetIssues();
    }
}