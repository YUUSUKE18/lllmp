let target = parseInt(readline());
let count = 0;

for (let i = 0; i < target - 1; i++) {
  for (let j = i + 1; j < target; j++) {
    if (i + j === target) {
      count++;
    }
  }
}

console.log(`pairs=${count}`);
