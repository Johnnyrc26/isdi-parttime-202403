var array = [1, 2, 3, 4, 5]

// Checks whether an element is even
var even = (element) => element % 2 === 0

console.log(array.some(even))
// Expected output: true
