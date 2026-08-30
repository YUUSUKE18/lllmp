let target: number | null = null;
let numbers: number[] = [];

process.stdin.setEncoding("utf8");
let inputData = "";

process.stdin.on("data", (data: string) => {
  inputData += data;
});

process.stdin.on("end", () => {
  const lines = inputData.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);

  if (lines.length < 2) {
    console.log("pairs=0");
    return;
  }

  // 1行目: 目標値
  const targetValue = parseInt(lines[0], 10);
  if (isNaN(targetValue)) {
    console.log("pairs=0");
    return;
  }
  target = targetValue;

  // 2行目以降: 数値
  for (let i = 1; i < lines.length; i++) {
    const num = parseInt(lines[i], 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  if (numbers.length < 2) {
    console.log("pairs=0");
    return;
  }

  // 2個の組の数を数える
  let pairCount = 0;
  const n = numbers.length;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (numbers[i] + numbers[j] === target) {
        pairCount++;
      }
    }
  }

  console.log(`pairs=${pairCount}`);
});
