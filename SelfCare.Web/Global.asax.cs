// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Global.asax.cs" company="SoftCrafters">
//   Copyright © 2015 
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

using System.Web;
using System.Web.Optimization;
using System.Web.Routing;

namespace SelfCare.Web
{
    public class Application : HttpApplication
    {
        protected void Application_Start()
        {
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
