A social media company, "ConnectMe", wants to analyze the demographics of its users. They have collected data on the age, city, and name of each user. The data is stored in an array of objects. The company wants to group this data by age to understand the distribution of users across different age groups.

Here is a sample dataset:

const users = [
  { name: 'Alice', age: 25, city: 'NYC' },
  { name: 'Bob', age: 30, city: 'LA' },
  { name: 'Charlie', age: 25, city: 'NYC' },
  { name: 'David', age: 30, city: 'NYC' }
];
Write a function groupBy that takes this array of objects and a key as input and returns an object with the grouped data. For example, if we call groupBy(users, 'age'), it should return:

{
  25: [{ name: 'Alice', age: 25, city: 'NYC' }, { name: 'Charlie', age: 25, city: 'NYC' }],
  30: [{ name: 'Bob', age: 30, city:'LA'}, {name:'David',age :30 ,city :'NYC'}]
}
Implement the groupBy function.