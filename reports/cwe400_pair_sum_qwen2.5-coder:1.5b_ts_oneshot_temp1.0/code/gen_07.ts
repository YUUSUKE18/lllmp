import { strict as assert } from 'assert';

const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let targetValue = parseInt(s.split(/\n+/)[0], 10);
  let pairsCount = 0;

  for (let i = 0; i < s.split(/\n+/).length - 1; i++) {
    const arr = s.split(/\n+/)[i + 1].split(/\s+/);
    for (let j = i + 1; j < s.split(/\n+/).length; j++) {
      const brr = s.split(/\n+/)[j + 1].split(/\s+/);
      if (arr.length !== brr.length) continue;

      let sum = 0;
      let mismatch = false;
      for (let k = 0; k < arr.length; k++) {
        const a = parseInt(arr[k], 10);
        const b = parseInt(brr[k], 10);
        sum += a + b;
        if (a !== b) mismatch = true;
      }

      if (sum === targetValue && !mismatch) {
        pairsCount++;
      }
    }
  }

  console.log(`pairs=${pairsCount}`);
});
