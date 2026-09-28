const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  let match;
  const regex = /(\d+):(\d+)/;
  while ((match = regex.exec(s)) !== null) {
    const valStr = parseInt(match[1], 10);
    if (Number.isNaN(valStr)) continue;
    const countNum = BigInt(parseInt(match[2], 10));
    count += valStr * countNum;
    sum += valStr * countNum;
  }
  console.log(`count=${BigInt(count).toString()} sum=${BigInt(sum).toString()}`);
});
