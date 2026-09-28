import { readLine } from 'process';

let pairs = 0;
let target = parseInt(readLine());

while (true) {
  let number = parseInt(readLine());
  if (number === target) {
    pairs++;
  } else if (number < target) {
    break;
  }
}

console.log(`pairs=${pairs}`);
