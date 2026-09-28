const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  const regex = /^\s*((?:[+-]?(?:\d+\.?\d*|\d*\.?\d+)(?:,[+\d+\.]?)*|,)+)(?:,)?\s*$/;
  for (const line of s.split("\n")) {
    if (line === "") continue;
    if (regex.test(line)) lines++;
  }
  console.log(`valid=${lines}`);
});
