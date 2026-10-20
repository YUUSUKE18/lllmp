const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const nums = s.split(/,/).map(f => f.trim());
  const unique = new Set(nums);
  const count = unique.size;
  const sum = unique.reduce((acc, num) => acc + parseInt(num, 10), 0);
  console.log(`count=${count} sum=${sum}`);
});
