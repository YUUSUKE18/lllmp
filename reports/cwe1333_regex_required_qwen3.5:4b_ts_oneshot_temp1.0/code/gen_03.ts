const data: string[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  const regex = /^(?:\s*[-+]?[0-9]+(?:\s*,\s*[-+]?[0-9]+)*)*\s*$/;
  
  const lines = s.trimEnd().split("\n");
  for (const line of lines) {
    if (!regex.test(line)) continue;
    count++;
  }
  
  console.log(`valid=${count}`);
});
