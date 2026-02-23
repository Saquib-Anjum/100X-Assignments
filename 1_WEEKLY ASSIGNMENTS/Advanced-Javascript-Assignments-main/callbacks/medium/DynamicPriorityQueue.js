// Problem Description – Priority Task Queue with Dynamic Concurrency
//
// You are required to implement a task queue that executes asynchronous
// tasks based on priority.
// Higher-priority tasks should be executed before lower-priority ones.
// The queue must enforce a concurrency limit, ensuring only a fixed number
// of tasks run at the same time.
// The concurrency limit can be updated dynamically while the system is running.
//
// Each task must invoke its callback when finished.

// --------------------- npm run DynamicPriorityQueue  ------------------------
class DynamicPriorityQueue {
  constructor(concurrency) {
    this.limit = concurrency;
    this.active = 0; // running tasks
    this.queue = []; // waiting tasks
  }

  setLimit(newLimit) {
    this.limit = newLimit;
    this.runNext(); // Try to start more tasks if possible
  }

  add(task, priority, onComplete) {
    this.queue.push({ task, priority, onComplete });

    // Sort descending by priority (higher first)
    this.queue.sort((a, b) => b.priority - a.priority);

    this.runNext();
  }

  runNext() {
    if (this.active >= this.limit) return;
    if (this.queue.length === 0) return;
    while (this.active < this.limit && this.queue.length > 0) {
      const item = this.queue.shift();
      if (!item) return;

      const { task, onComplete } = item;
      this.active++;

      task((err, result) => {
        this.active--;

        if (typeof onComplete === "function") {
          onComplete(err, result);
        }

        // Start next queued task
        this.runNext();
      });
    }
  }
}

module.exports = DynamicPriorityQueue;
