using SelfCare.Data.Models;

namespace SelfCare.Data.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<SelfCare.Data.DataContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(SelfCare.Data.DataContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.

            context.Categories.AddOrUpdate<Category>(
              p => p.Name,
              new Category { Name = "Low", Description = "Least priority" },
              new Category { Name = "Medium", Description = "We need to give some priority" },
              new Category { Name = "Severe",Description = "We need to get action as soon as possible"},
              new Category { Name = "Critical", Description = "A show stopper, we need to act immidiatetly" }
            );

        }
    }
}
