import { readFileSync } from 'fs';

const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split("\n")[0], 10);
  let count = 0;
  for (let i = 1; i < s.length; i++) {
    const j = i + 1;
    while (j < s.length && !Number.isNaN(parseInt(s[j], 10))) {
      const sum = parseInt(s[i], 10) + parseInt(s[j], 10);
      if (sum === target) count++;
      j++;
    }
    i = j;
  }
  console.log(`pairs=${count}`);
});
