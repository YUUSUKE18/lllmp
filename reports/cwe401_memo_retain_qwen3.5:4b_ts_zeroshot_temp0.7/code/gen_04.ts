const memo: Map<number, number> = new Map();

function calculateSteps(n: number): number {
  if (n === 1) return 0;
  
  let steps = 0;
  while (n !== 1) {
    if (memo.has(n)) {
      n = memo.get(n)!;
    } else {
      if (n % 2 === 0) {
        n = Math.floor(n / 2);
      } else {
        n = 3 * n + 1;
      }
    }
    
    steps++;
    
    if (!memo.has(n)) {
      memo.set(n, steps);
    }
  }
  
  return steps;
}

function main() {
  let totalSteps = 0;
  let line: string;
  
  while ((line = process.stdin.nextLine()) !== null) {
    if (line === '') continue;
    
    const n = parseInt(line);
    if (isNaN(n)) continue;
    
    if (n > 0 && Number.isInteger(n)) {
      totalSteps += calculateSteps(n);
    }
  }
  
  console.log(`total=${totalSteps}`);
}

main();
