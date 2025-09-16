function groupBy(arr, key) {
  // final result will be stored here
  let result = {};  

  // loop through every item in the array
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];          // current object, e.g. { name: 'Alice', age: 25, city: 'NYC' }
    let groupKey = item[key];   // value of the key, e.g. item['age'] → 25

    // if this groupKey doesn’t exist in result yet, create an empty array
    if (result[groupKey] === undefined) {
      result[groupKey] = [];
    }

    // push the current item into the right group
    result[groupKey].push(item);
  }

  // return the grouped object
  return result;
}

// Example usage:
const users = [
  { name: 'Alice', age: 25, city: 'NYC' },
  { name: 'Bob', age: 30, city: 'LA' },
  { name: 'Charlie', age: 25, city: 'NYC' },
  { name: 'David', age: 30, city: 'NYC' }
];

console.log(groupBy(users, 'age'));
