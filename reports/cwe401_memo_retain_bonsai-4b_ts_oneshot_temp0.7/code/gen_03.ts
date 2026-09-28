const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let map = new Map<number, number>();
  let total = 0;
  const values = s.split(/\s+/).filter(Boolean).map((val) => parseInt(val));
  values.forEach(n => {
    if (map.has(n)) continue;
    let steps = 0;
    let current = n;
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
      if (map.has(current)) {
        break;
      }
    }
    if (map.has(1)) {
      steps = 0;
    }
    map.set(n, steps);
    map.set(current, steps);
    total += steps;
  });
  console.log(`total=${total}`);
});
