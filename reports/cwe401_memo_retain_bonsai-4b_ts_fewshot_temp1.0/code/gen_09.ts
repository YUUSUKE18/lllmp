const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let totalSteps = 0;
  const memo: Map<number, number> = new Map<number, number>();
  
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (ch === " ") {
      i++;
      continue;
    }
    const numStr = ch.toString();
    let num = 0;
    let j = 0;
    while (j < numStr.length && numStr[j] >= '0' && numStr[j] <= '9') {
      num = num * 10 + (numStr[j] - '0');
      j++;
    }
    
    if (num < 1 || num > 2147483647) {
      i++;
      continue;
    }
    
    if (memo[num] !== undefined) {
      i++;
      continue;
    }
    
    let steps = 0;
    let current = num;
    
    if (current === 1) {
      memo[num] = 0;
      i++;
      continue;
    }
    
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
      
      // 安全な64bit整数の上限：1e9以上は溢れが予測可能
      if (current > 2147483647) {
        memo[num] = Infinity;
        break;
      }
    }
    
    memo[num] = steps;
    totalSteps += steps;
    i += 1;
  }
  
  console.log(`total=${totalSteps}`);
});
