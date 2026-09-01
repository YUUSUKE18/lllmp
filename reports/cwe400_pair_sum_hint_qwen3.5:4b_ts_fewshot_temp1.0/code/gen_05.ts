const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (let i = 0; i < s.length; ) {
    if (s[i] === "\n") {
      lines++;
      i++;
      continue;
    }
    if (s[i] === " ") {
      i++;
      continue;
    }
    if (!isNaN(parseInt(s.substring(i).match(/\d+/)[0], 10))) {
      break;
    }
    i++;
  }

  if (lines === 0) {
    console.log(`pairs=0`);
    return;
  }

  const target = parseInt(lines.substring(1).trim(), 10);
  const nums: number[] = [];

  for (let i = lines.length; i < s.length; ) {
    let lineEnd = i;
    while (lineEnd < s.length && (s[lineEnd] === " " || s[lineEnd] === "\n")) {
      lineEnd++;
    }

    const numStr = s.substring(i, lineEnd);
    if (!isNaN(parseInt(numStr, 10))) {
      nums.push(parseInt(numStr, 10));
      i = lineEnd + 1;
      continue;
    }
    i++;
  }

  if (nums.length < 2) {
    console.log(`pairs=0`);
    return;
  }

  let count = 0;
  const seen = new Set();

  for (const x of nums) {
    const y = target - x;
    if (seen.has(y)) {
      count++;
    }
    seen.add(x);
  }

  console.log(`pairs=${count}`);
});
