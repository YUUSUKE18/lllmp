let count = 0;
let sum = 0;
const lines: string[] = [];

process.stdin.setEncoding("utf8");

process.stdin.on("data", (data: string) => {
  lines.push(data.trim());
});

process.stdin.on("end", () => {
  if (lines.length === 0) {
    console.log(`count=0 sum=0`);
    return;
  }

  const firstLine = lines[0];
  if (!firstLine) {
    console.log(`count=0 sum=0`);
    return;
  }

  const numCount = parseInt(firstLine, 10);
  if (isNaN(numCount)) {
    console.log(`count=0 sum=0`);
    return;
  }

  let actualCount = 0;
  let actualSum = 0;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line) {
      const num = parseInt(line, 10);
      if (!isNaN(num)) {
        actualCount++;
        actualSum += num;
      }
    }
  }

  console.log(`count=${actualCount} sum=${actualSum}`);
});
