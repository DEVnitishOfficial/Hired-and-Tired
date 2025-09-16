function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    // extract the value of the key
    const groupKey = item[key];

    // if group doesn't exist, create it
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }

    // push the item into the group
    acc[groupKey].push(item);

    return acc;
  }, {});
}

// Example usage:
const users = [
  { name: 'Alice', age: 25, city: 'NYC' },
  { name: 'Bob', age: 30, city: 'LA' },
  { name: 'Charlie', age: 25, city: 'NYC' },
  { name: 'David', age: 30, city: 'NYC' }
];

console.log(groupBy(users, 'age'));
