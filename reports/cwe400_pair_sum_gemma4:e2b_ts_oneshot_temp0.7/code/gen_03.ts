let target: number | undefined = undefined;
const numbers: number[] = [];

process.stdin.setEncoding("utf8");

process.stdin.on("data", (data: string) => {
  const lines = data.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  if (target === undefined) {
    // 1行目: 目標値
    target = parseInt(lines[0], 10);
  } else if (lines.length > 0) {
    // 2行目以降: 整数
    const num = parseInt(lines[0], 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }
});

process.stdin.on("end", () => {
  if (target === undefined || numbers.length < 2) {
    process.stdout.write("pairs=0\n");
    return;
  }

  let count = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
