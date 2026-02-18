/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/
//  Number.MAX_SAFE_INTEGER
// Number.MIN_SAFE_INTEGER
function findLargestElement(arr) {
  if (arr.length === 0) return undefined;
  let max = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

module.exports = findLargestElement;
