/**
 * Determine if the given callable is valid.
 *
 * @param {Array|Function} callable
 * @param {String} message
 */
const validCallable = function validCallable (callable) {
  return Array.isArray(callable) || typeof callable === 'function'
}

/**
 * Call function.
 *
 * @param  {Array|Function} callable
 * @param  {Array} args
 * @param  {Object} dScope
 * @return {Any}
 */
const call = function call (callable, args = [], dScope) {
  if (Array.isArray(callable)) {
    const [scope, func] = callable

    return scope[func].apply(scope, args)
  } else {
    return callable.apply(dScope, args)
  }
}

export { call, validCallable }
