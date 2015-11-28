using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SelfCare.Services;

namespace SelfCare.WebServices.Controllers
{
    [Authorize]
    public class ValuesController : ApiController
    {
        private readonly ICategoryService _categoryService;

        public ValuesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        // GET api/values
        public IEnumerable<string> Get()
        {
            return _categoryService.GetCategoryNames(); // new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
