const target: number = parseInt(process.argv[2], 10);
let pairs: number = 0;

let i = 0;
while (i < process.argv.length - 2) {
  const sum: number = 0;
  let j = i + 1;
  while (j < process.argv.length) {
    sum += parseInt(process.argv[j], 10);
    if (sum === target) {
      pairs++;
    }
    j++;
  }
  i++;
}

console.log(`pairs=${pairs}`);
