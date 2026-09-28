const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (const line of s.split("\n")) {
    if (/^[[:space:]]*([0-9]+(?:,[0-9]+)*)[[:space:]]*$/.test(line)) {
      valid++;
    }
  }
  console.log(`valid=${valid}`);
});
