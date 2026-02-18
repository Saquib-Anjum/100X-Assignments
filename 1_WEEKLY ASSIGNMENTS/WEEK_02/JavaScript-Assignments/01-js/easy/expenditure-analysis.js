/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

function calculateTotalSpentByCategory(transactions) {
  const totals = {};

  for (const item of transactions) {
    const currCategory = item.category;

    if (totals[currCategory]) {
      // 2. Add the price to the existing total
      totals[currCategory].price += item.price;
    } else {
      // 3. Create the initial entry
      totals[currCategory] = { price: item.price };
    }
  }

  // 4. Map it to your final desired format
  const result = Object.entries(totals).map(([key, value]) => {
    return {
      category: key,
      totalSpent: value.price,
    };
  });

  console.log(result);
  return result; // Good practice to return the value
}

module.exports = calculateTotalSpentByCategory;
