const memo: { [key: number]: number } = {};

let total = 0;

function getSteps(n: number): number {
  if (n === 1) return 0;
  if (memo[n] !== undefined) return memo[n];
  
  let steps = 1;
  let current = n;
  
  while (current !== 1) {
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
  }
  
  memo[n] = steps;
  return steps;
}

process.stdin
  .pipe({
    format: 'number',
    end: () => {
      let line = process.stdin.readline();
      while (line && !/^\s*$/.test(line)) {
        const n = parseInt(line);
        if (!isNaN(n) && n >= 1) {
          total += getSteps(n);
        }
        line = process.stdin.readline();
      }
    }
  })
  .on('data', (data) => {
    const line = data.toString();
    const parts = line.split(/\s+/).filter(part => part);
    parts.forEach((part) => {
      const n = parseInt(part);
      if (!isNaN(n) && n >= 1) {
        total += getSteps(n);
      }
    });
  })
  .on('end', () => {
    console.log(`total=${total}`);
  });
