const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const validLines = 0;
  const lineRegex = /^[\s\S]*?(?:^|\n)(?:[^,]+(?:,[^,]+)*|,$)/g;
  const lines = s.split("\n");
  for (const line of lines) {
    if (line.trim() === "") continue;
    const trimmedLine = line.trim();
    if (trimmedLine.match(lineRegex)) validLines++;
  }
  console.log(`valid=${validLines}`);
});
