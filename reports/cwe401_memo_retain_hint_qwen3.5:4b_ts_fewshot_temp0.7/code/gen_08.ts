const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  memo.set(1, 0);

  let total = 0;
  for (const line of s.split(/\r?\n/)) {
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n) || !Number.isFinite(n)) continue;

    const calculate = (val: number): number => {
      let steps = 0;
      while (val !== 1) {
        if (memo.has(val)) {
          steps += memo.get(val)!;
          break;
        }
        if (val % 2 === 0) val = val / 2;
        else val = 3 * val + 1;
      }
      return steps;
    };

    // 初期状態からループしてメモを更新していく
    let current = n;
    let count = 0;
    while (current !== 1) {
      if (!memo.has(current)) {
        memo.set(current, -1); // 未解決のフラグ
      }
      
      let nextVal: number;
      if (current % 2 === 0) {
        nextVal = Math.floor(current / 2);
      } else {
        nextVal = 3 * current + 1;
      }

      if (!memo.has(nextVal)) {
        memo.set(nextVal, -1);
      }

      count++;
      current = nextVal;
    }

    // メモリを再計算して正解値を入れる
    for (const [key, val] of memo.entries()) {
      if (val === -1) {
        let steps = 0;
        let temp = key;
        while (temp !== 1) {
          if (memo.has(temp)) break;
          if (temp % 2 === 0) temp = Math.floor(temp / 2);
          else temp = 3 * temp + 1;
          steps++;
        }
        // リストを反転して計算し直す（効率的な再帰シミュレーション）
        const stack: number[] = [];
        let curr = key;
        while (curr !== 1) {
          if (memo.has(curr)) break;
          if (curr % 2 === 0) curr = Math.floor(curr / 2);
          else curr = 3 * curr + 1;
          stack.push(curr);
        }
        
        // スタックから下から上まで計算して戻す
        for (let i = 0; i < stack.length; i++) {
          const val = stack[i];
          let c = 0;
          let t = val;
          while (t !== 1) {
            if (memo.has(t)) break;
            if (t % 2 === 0) t = Math.floor(t / 2);
            else t = 3 * t + 1;
            c++;
          }
          memo.set(val, c);
        }
      }
    }

    const stepsForN = memo.get(n)!;
    total += stepsForN;
  }
  console.log(`total=${total}`);
});
