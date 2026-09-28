let count = 0;
let sum = 0;
let lines = [];

process.stdin.setEncoding("utf8");

process.stdin.on("data", (data: string) => {
  lines.push(data.trim());
});

process.stdin.on("end", () => {
  if (lines.length === 0) {
    console.log("count=0 sum=0");
    return;
  }

  const firstLine = lines[0];
  if (!firstLine) {
    console.log("count=0 sum=0");
    return;
  }

  const countStr = firstLine.split(/\s+/)[0];
  const initialCount = parseInt(countStr, 10);

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;

    const num = parseInt(line, 10);
    if (!isNaN(num)) {
      count++;
      sum += num;
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
