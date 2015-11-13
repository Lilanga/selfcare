// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Startup.cs" company="SoftCrafters">
//   Copyright © 2015 
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

using Owin;
using SelfCare.Web;

[assembly: Microsoft.Owin.OwinStartup(typeof(Startup))]

namespace SelfCare.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //// For more information on how to configure your application, visit:
            //// http://go.microsoft.com/fwlink/?LinkID=316888

            this.ConfigureAuth(app);
        }
    }
}
