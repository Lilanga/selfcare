using System;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace SelfCare.Data.Repository
{
    /// <summary>
    /// Data Repository
    /// </summary>
    /// <typeparam name="TObject">The type of the object.</typeparam>
    public class Repository<TObject> : IRepository<TObject> where TObject : class
    {
        protected DataContext Context;
        private readonly bool _shareContext;

        /// <summary>
        /// Initializes a new instance of the <see cref="Repository{TObject}"/> class.
        /// </summary>
        public Repository()
        {
            Context = DataContext.Create();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="Repository{TObject}"/> class.
        /// </summary>
        /// <param name="context">The context.</param>
        public Repository(DataContext context)
        {
            Context = context;
            _shareContext = true;
        }

        /// <summary>
        /// Gets or sets the database set.
        /// </summary>
        /// <value>
        /// The database set.
        /// </value>
        protected DbSet<TObject> DbSet => Context.Set<TObject>();

        /// <summary>
        /// Releases unmanaged and - optionally - managed resources.
        /// </summary>
        public void Dispose()
        {
            if (_shareContext) Context?.Dispose();
        }

        /// <summary>
        /// Get All objects.
        /// </summary>
        /// <returns></returns>
        public virtual IQueryable<TObject> All()
        {
            return DbSet.AsQueryable();
        }

        /// <summary>
        /// Filters using specified predicate.
        /// </summary>
        /// <param name="predicate">The predicate.</param>
        /// <returns></returns>
        public virtual IQueryable<TObject> Filter(Expression<Func<TObject, bool>> predicate)
        {
            return DbSet.Where(predicate).AsQueryable();
        }

        /// <summary>
        /// Filters using specified filter.
        /// </summary>
        /// <param name="filter">The filter.</param>
        /// <param name="total">The total records.</param>
        /// <param name="index">page index.</param>
        /// <param name="size">page size.</param>
        /// <returns></returns>
        public virtual IQueryable<TObject> Filter(Expression<Func<TObject, bool>> filter,
                 out int total, int index = 0, int size = 50)
        {
            var skipCount = index * size;
            var resetSet = filter != null ? DbSet.Where(filter).AsQueryable() :
                DbSet.AsQueryable();
            resetSet = skipCount == 0 ? resetSet.Take(size) :
                resetSet.Skip(skipCount).Take(size);
            total = resetSet.Count();
            return resetSet.AsQueryable();
        }

        /// <summary>
        /// Determines whether object contains using the specified predicate.
        /// </summary>
        /// <param name="predicate">The predicate.</param>
        /// <returns></returns>
        public bool Contains(Expression<Func<TObject, bool>> predicate)
        {
            return DbSet.Count(predicate) > 0;
        }

        /// <summary>
        /// Finds the specified keys.
        /// </summary>
        /// <param name="keys">The keys.</param>
        /// <returns></returns>
        public virtual TObject Find(params object[] keys)
        {
            return DbSet.Find(keys);
        }

        /// <summary>
        /// Finds using specified predicate.
        /// </summary>
        /// <param name="predicate">The predicate.</param>
        /// <returns></returns>
        public virtual TObject Find(Expression<Func<TObject, bool>> predicate)
        {
            return DbSet.FirstOrDefault(predicate);
        }

        /// <summary>
        /// Creates the specified object.
        /// </summary>
        /// <param name="TObject">The t object.</param>
        /// <returns></returns>
        public virtual TObject Create(TObject TObject)
        {
            var newEntry = DbSet.Add(TObject);
            if (!_shareContext)
                Context.SaveChanges();
            return newEntry;
        }

        /// <summary>
        /// Gets or sets the count.
        /// </summary>
        /// <value>
        /// The count.
        /// </value>
        public virtual int Count => DbSet.Count();

        /// <summary>
        /// Deletes the specified object.
        /// </summary>
        /// <param name="TObject">The t object.</param>
        /// <returns></returns>
        public virtual int Delete(TObject TObject)
        {
            DbSet.Remove(TObject);
            return !_shareContext ? Context.SaveChanges() : 0;
        }

        /// <summary>
        /// Updates the specified object.
        /// </summary>
        /// <param name="TObject">The t object.</param>
        /// <returns></returns>
        public virtual int Update(TObject TObject)
        {
            var entry = Context.Entry(TObject);
            DbSet.Attach(TObject);
            entry.State = EntityState.Modified;
            return !_shareContext ? Context.SaveChanges() : 0;
        }

        /// <summary>
        /// Deletes object using specified predicate.
        /// </summary>
        /// <param name="predicate">The predicate.</param>
        /// <returns></returns>
        public virtual int Delete(Expression<Func<TObject, bool>> predicate)
        {
            var objects = Filter(predicate);
            foreach (var obj in objects)
                DbSet.Remove(obj);
            return !_shareContext ? Context.SaveChanges() : 0;
        }
    }
}
