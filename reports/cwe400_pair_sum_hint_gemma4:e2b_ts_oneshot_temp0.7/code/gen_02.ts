let target: number | null = null;
let numbers: number[] = [];

process.stdin.setEncoding('utf8');

process.stdin.on('data', (data: string) => {
  const lines = data.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  if (target === null) {
    // 1行目が目標値
    target = parseInt(lines[0], 10);
  } else {
    // 2行目以降が整数
    for (const line of lines) {
      const num = parseInt(line, 10);
      if (!isNaN(num)) {
        numbers.push(num);
      }
    }
  }
});

process.stdin.on('end', () => {
  if (target === null || numbers.length < 2) {
    process.stdout.write('pairs=0\n');
    return;
  }

  let pairCount = 0;
  const n = numbers.length;

  // 2つの組 (i, j) を探す。i != j
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (numbers[i] + numbers[j] === target) {
        pairCount++;
      }
    }
  }

  process.stdout.write(`pairs=${pairCount}\n`);
});
