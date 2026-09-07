import { readFileSync } from "fs";

const data = readFileSync(0).toString("utf8").split("\n");
const target = parseInt(data[0], 10);
const pairs = 0;

for (let i = 1; i < data.length; i++) {
  for (let j = i + 1; j < data.length; j++) {
    const sum = parseInt(data[i], 10) + parseInt(data[j], 10);
    if (sum === target) {
      pairs++;
    }
  }
}

console.log(`pairs=${pairs}`);
