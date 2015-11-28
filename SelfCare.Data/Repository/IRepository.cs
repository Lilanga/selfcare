using System;
using System.Linq;
using System.Linq.Expressions;

namespace SelfCare.Data.Repository
{
    /// <summary>
    /// Repository Interface definition
    /// </summary>
    /// <typeparam name="T">class type</typeparam>
    public interface IRepository<T> : IDisposable where T : class
    {
        /// <summary>
        /// Gets all objects from database
        /// </summary>
        IQueryable<T> All();

        /// <summary>
        /// Query objects from database using filter.
        /// </summary>
        /// <param name="predicate">Specified a filter</param>
        IQueryable<T> Filter(Expression<Func<T, bool>> predicate);

        /// <summary>
        /// Filters the specified filter.
        /// </summary>
        /// <param name="filter">The filter.</param>
        /// <param name="total">total record count.</param>
        /// <param name="index">page index.</param>
        /// <param name="size">page size.</param>
        /// <returns></returns>
        IQueryable<T> Filter(Expression<Func<T, bool>> filter,
            out int total, int index = 0, int size = 50);

        /// <summary>
        /// Gets the object(s) is exists in database by specified filter.
        /// </summary>
        /// <param name="predicate">Specified the filter expression</param>
        bool Contains(Expression<Func<T, bool>> predicate);

        /// <summary>
        /// Find object using keys.
        /// </summary>
        /// <param name="keys">Specified the search keys.</param>
        T Find(params object[] keys);

        /// <summary>
        /// Find object using expression.
        /// </summary>
        /// <param name="predicate"></param>
        T Find(Expression<Func<T, bool>> predicate);

        /// <summary>
        /// Create a new object.
        /// </summary>
        /// <param name="newObject">New object to create.</param>
        T Create(T newObject);

        /// <summary>
        /// Delete the object from database.
        /// </summary>
        /// <param name="deleteObject">Existing object to delete.</param>        
        int Delete(T deleteObject);

        /// <summary>
        /// Delete objects from database using filter expression.
        /// </summary>
        /// <param name="predicate"></param>
        int Delete(Expression<Func<T, bool>> predicate);

        /// <summary>
        /// Update object changes and persist changes.
        /// </summary>
        /// <param name="updateObject">object to save.</param>
        int Update(T updateObject);

        /// <summary>
        /// Get the total objects count.
        /// </summary>
        int Count { get; }
    }
}