const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  const lines = s.split("\n");
  for (const line of lines) {
    const stripped = line.trim();
    if (stripped === "") continue;
    const nums = stripped.split(",");
    let hasValid = false;
    for (const num of nums) {
      if (num.trim() === "") continue;
      if (/^\d+$/.test(num)) {
        hasValid = true;
        break;
      }
    }
    if (hasValid) valid++;
  }
  console.log(`valid=${valid}`);
});
