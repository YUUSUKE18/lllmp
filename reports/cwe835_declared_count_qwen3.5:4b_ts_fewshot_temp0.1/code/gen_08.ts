const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (const ch of s) if (ch === "\n") lines++;
  const linesArr = s.split("\n");
  let count = 0;
  let sum = 0n;
  for (let i = 0; i < linesArr.length; i++) {
    const line = linesArr[i];
    if (line.trim() === "") continue;
    if (i === 0) {
      const n = parseInt(line, 10);
      if (!Number.isNaN(n)) count = n;
    } else {
      for (const ch2 of line) {
        if (ch2 >= "0" && ch2 <= "9") {
          const digit = parseInt(ch2, 10);
          sum += BigInt(digit);
          count++;
        }
      }
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
