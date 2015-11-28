using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Practices.Unity;
using Newtonsoft.Json.Serialization;
using SelfCare.Data;
using SelfCare.Services;
using SelfCare.WebServices.Providers;

namespace SelfCare.WebServices
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            // Unity Configurations
            var container = new UnityContainer();
            container.RegisterType<ICategoryService, CategoryService>
                (new PerThreadLifetimeManager())
                          .RegisterType<ICareDataContext, CareDataContext>();
            config.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}
