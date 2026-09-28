let target: number = parseInt(process.stdin.readLine()!);
let values: number[] = [];

for (let i = 0; i < target; i++) {
  values.push(parseInt(process.stdin.readLine()!));
}

const pairs: number = values.reduce((count, value, index) => {
  values.forEach((otherValue, otherIndex) => {
    if (index !== otherIndex && value + otherValue === target) {
      count++;
    }
  });
  return count;
}, 0);

console.log(`pairs=${pairs}`);
