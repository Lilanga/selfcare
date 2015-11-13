// --------------------------------------------------------------------------------------------------------------------
// <copyright file="RouteConfig.cs" company="SoftCrafters">
//   Copyright © 2015 
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

using System.Web.Routing;
using SelfCare.Web.Routing;

namespace SelfCare.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.Add("Default", new DefaultRoute());
        }
    }
}
