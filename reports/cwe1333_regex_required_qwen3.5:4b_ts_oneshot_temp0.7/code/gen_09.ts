const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let validCount = 0;
  const regex = /^\s*(?:\d+(?:,\s*\d+)*|(?:\s*,\s*)+\d+)\s*$/;
  for (const line of s.split(/\r?\n/)) {
    if (line.trim() === "") {
      continue;
    }
    if (regex.test(line)) {
      validCount++;
    } else {
      // Invalid rows are ignored as per requirement "valid=<valid row count>"
      // Only counting valid lines.
    }
  }
  console.log(`valid=${validCount}`);
});
