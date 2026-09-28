const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  let memo = {};
  let total = 0;
  const s = Buffer.concat(data).toString("utf8");
  let c = 0;
  for (const line of s.split("\n")) {
    if (line.trim() === "") continue;
    const n = parseInt(line.trim(), 10);
    if (isNaN(n)) continue;
    if (memo[n]) {
      continue;
    }
    let steps = 0;
    let current = n;
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      if (memo[current]) break;
      memo[current] = true;
      steps++;
    }
    if (memo[1]) {
      steps = 0;
    }
    total += steps;
  }
  console.log(`total=${total}`);
});
