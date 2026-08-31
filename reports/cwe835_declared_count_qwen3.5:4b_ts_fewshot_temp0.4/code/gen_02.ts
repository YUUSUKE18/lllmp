const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = BigInt(0);
  let firstLineRead = false;

  for (const line of s.split("\n")) {
    if (line.trim() === "") continue;

    if (!firstLineRead) {
      const n = parseInt(line, 10);
      if (!Number.isNaN(n)) {
        count = BigInt(n);
        firstLineRead = true;
      }
      continue;
    }

    if (firstLineRead) {
      const parsed = parseInt(line, 10);
      if (!Number.isNaN(parsed)) {
        sum += BigInt(parsed);
        count++;
      }
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
