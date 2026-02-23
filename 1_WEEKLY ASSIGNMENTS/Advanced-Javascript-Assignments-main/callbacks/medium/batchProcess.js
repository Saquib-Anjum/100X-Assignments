// Problem Description – Ordered Parallel Batcher
//
// You need to process many items in parallel, but with a fixed
// concurrency limit to avoid resource exhaustion.
//
// Tasks should start as soon as a slot is free, and the final
// results must preserve the original input order.
//
// Requirements:
// - Run at most `limit` workers in parallel.
// - Preserve the original order of results.
// - Start new work as soon as one finishes.
// - Stop and return an error if any task fails.

// ---------------- npm run batchProcess   -------------------------------------
function batchProcess(items, limit, worker, onComplete) {
  const results = new Array(items.length);
  let inProgress = 0;
  let index = 0;
  let completed = 0;
  let hasError = false;

  function launchNext() {
    // Stop if Error
    if (hasError) return;

    // All items processed
    if (completed === items.length) {
      return onComplete(null, results);
    }

    // Start tasks while slots available
    while (inProgress < limit && index < items.length) {
      const currentIndex = index++;
      inProgress++;

      worker(items[currentIndex], (err, data) => {
        inProgress--;

        if (hasError) return;

        if (err) {
          hasError = true;
          return onComplete(err);
        }

        results[currentIndex] = data;
        completed++;

        launchNext(); // Start next task immediately
      });
    }
  }

  // Edge case: empty list
  if (items.length === 0) {
    return onComplete(null, []);
  }

  launchNext();
}

module.exports = batchProcess;
