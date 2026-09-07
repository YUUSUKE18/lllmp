import { stdin } from "node:process";

const target = parseInt(readline(), 10);
const numbers: number[] = [];
let pairs = 0;

stdin.on("data", (data: Buffer) => {
  const s = data.toString("utf8");
  for (const n of s.trim().split(" ")) {
    if (n.trim() === "") continue;
    const num = parseInt(n, 10);
    if (Number.isNaN(num)) continue;
    numbers.push(num);
  }
});

stdin.on("end", () => {
  numbers.sort((a, b) => a - b);
  let left = 0, right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum < target) left++;
    else if (sum > target) right--;
    else {
      pairs++;
      left++;
      right--;
    }
  }

  console.log(`pairs=${pairs}`);
});
