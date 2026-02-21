// Problem Description – once(fn)
//
// You are required to implement a wrapper function named once that accepts a
// callback-based asynchronous function `fn`.
// The wrapper should ensure that `fn` is executed only on the first call.
// Any subsequent calls should not re-execute `fn` and should instead invoke
// the callback with the same result (or error) from the first invocation.

function once(fn) {
  let called = false;
  let result;
  let error;
  let callbacks = [];
  return function (...arg) {
    const cb = arg.pop();
    if (called) {
      return cb(error, result);
    }
    callbacks.push(cb);
    // Only first call should execute fn
    if (callbacks.length === 1) {
      fn(...arg, (err, data) => {
        called = true;
        error = err;
        result = data;

        // Resolve all waiting callbacks
        callbacks.forEach((callback) => callback(error, result));
        callbacks = [];
      });
    }
  };
}

module.exports = once;
