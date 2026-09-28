const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const elements = s.split(",");
  let count = 0, max = -9007199254740992;
  for (const element of elements) {
    element = element.trim();
    if (element === "") continue;
    const n = parseInt(element, 10);
    if (Number.isNaN(n)) continue;
    count++;
    if (n > max) max = n;
  }
  console.log(`count=${count} max=${max}`);
});
