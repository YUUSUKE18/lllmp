const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target = 0;
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (line === "") {
      i++;
      continue;
    }
    const n = parseInt(line, 10);
    if (!Number.isNaN(n)) {
      target = n;
      break;
    }
    i++;
  }

  const nums: number[] = [];
  let j = i + 1;
  while (j < lines.length) {
    const line = lines[j].trim();
    if (line === "") {
      j++;
      continue;
    }
    const n = parseInt(line, 10);
    if (!Number.isNaN(n)) {
      nums.push(n);
    } else {
      j++;
    }
  }

  let count = 0n;
  for (let k = 0; k < nums.length; k++) {
    for (let l = k + 1; l < nums.length; l++) {
      const sum = BigInt(nums[k]) + BigInt(nums[l]);
      if (sum === BigInt(target)) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
