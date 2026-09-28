const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  const lines = s.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    const matches = line.match(/^[0-9]+(?:,[0-9]+)*$|^[0-9]+(?:,[0-9]+)*$/);
    if (matches && matches[0].length > 1) valid++;
  }
  console.log(`valid=${valid}`);
});
