

## 1. **Using a simple `for...of` loop (Most Readable for Beginners)**

We already wrote this — very clear, no hidden magic:

```javascript
function groupBy(arr, key) {
  let result = {};
  for (const item of arr) {
    let groupKey = item[key];
    if (result[groupKey] === undefined) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
  }
  return result;
}
```

✅ Pros: Easy to understand, step-by-step.
❌ Cons: A little longer than other methods.

---

## 2. **Using `reduce` (Concise & Functional Style)**

The version I showed first:

```javascript
function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const groupKey = item[key];
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(item);
    return acc;
  }, {});
}
```

✅ Pros: Concise, one-liner accumulator style, common in modern JS.
❌ Cons: Harder to read for beginners until you understand `reduce`.

---

## 3. **Using `Map` instead of plain object (More Flexible)**

If keys are not just strings/numbers (like actual objects or symbols), `Map` is better because it can store *any type* as a key:

```javascript
function groupBy(arr, key) {
  const map = new Map();

  for (const item of arr) {
    const groupKey = item[key];
    if (!map.has(groupKey)) {
      map.set(groupKey, []);
    }
    map.get(groupKey).push(item);
  }

  // Convert Map back to an object (if you want plain object)
  return Object.fromEntries(map);
}
```

✅ Pros: Works with any type of key (not just string/number).
❌ Cons: Slightly more code, extra conversion if you need an object.

---

## 4. **Using `Object.groupBy` (Modern & Clean — Stage 3 Proposal / Available in Node 20+ and modern browsers)**

If your environment supports it:

```javascript
const result = Object.groupBy(users, user => user.age);
```

Output:

```javascript
{
  25: [ { name: 'Alice', age: 25, city: 'NYC' }, { name: 'Charlie', age: 25, city: 'NYC' } ],
  30: [ { name: 'Bob', age: 30, city: 'LA' }, { name: 'David', age: 30, city: 'NYC' } ]
}
```

✅ Pros: Extremely short and expressive.
❌ Cons: Not fully supported everywhere yet (needs latest Node/modern browsers).

---

## 🚀 Which one is *best*?

* **For learning / beginners** → the plain `for...of` loop (clear and explicit).
* **For production code (today)** → `reduce` or `Map`, because they are widely supported and concise.
* **For future-proof / modern JS** → `Object.groupBy` (when environment supports it).

---
