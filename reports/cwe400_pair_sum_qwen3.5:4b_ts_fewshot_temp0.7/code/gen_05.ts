const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let target = 0;
  let lineIdx = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "\n") {
      lineIdx++;
      if (lineIdx === 1) {
        const trimmed = s.substring(0, i).trim();
        target = parseInt(trimmed, 10);
        if (!Number.isNaN(target)) continue;
        else break;
      }
      break;
    }
  }
  let numbers: number[] = [];
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === "\n") {
      const lineContent = s.substring(0, i);
      const trimmed = lineContent.trim();
      if (trimmed === "") continue;
      const n = parseInt(trimmed, 10);
      if (!Number.isNaN(n)) {
        numbers.push(Number(-n));
      } else {
        break;
      }
    }
  }
  let count = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        count++;
      }
    }
  }
  console.log(`pairs=${count}`);
});
