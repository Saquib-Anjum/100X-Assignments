// Problem Description – retryOnce(fn)
//
// You are given a function `fn` that returns a Promise.
// Your task is to return a new function that calls `fn` and retries it once
// if the first attempt rejects.
// If the second attempt also rejects, the error should be propagated.

function retryOnce(fn) {
  return function (...args) {
    const callback = args.pop(); // last argument

    // First attempt
    fn(...args, (err, data) => {
      if (!err) {
        return callback(null, data);
      }

      // Retry once
      fn(...args, (err2, data2) => {
        if (!err2) {
          callback(null, data2);
        } else {
          callback(err2, null);
        }
      });
    });
  };
}

module.exports = retryOnce;
