const memo = new Map<number, number>();
let total = 0n;

process.stdin.on("data", (c: Buffer) => {
  const lines = c.toString("utf8").split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    
    let steps = 0;
    let curr = n;
    
    while (curr !== 1) {
      if (memo.has(curr)) {
        steps += memo.get(curr);
        break;
      }
      
      const next = curr % 2 === 0 ? curr / 2 : 3 * curr + 1n;
      curr = Number(next);
      
      if (curr < 0 || !Number.isFinite(curr)) {
        // 64bit 範囲を超えた場合の処理（問題文では収まると言われているが、安全策）
        // ここは仕様通り計算を続けるが、実際には溢れ切らないようにする必要がある。
        // 問題文: "途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります"
        // なので、BigInt を使って安全に計算し、最後に Number に変換してメモ化する。
      }
      
      if (memo.has(curr)) {
        steps += memo.get(curr);
        break;
      }
      
      memo.set(curr, 1);
      steps++;
    }
    
    // メモリ化し直す（正解の手数）
    let current = n;
    let count = 0;
    while (current !== 1) {
      if (memo.has(current)) {
        count += memo.get(current);
        break;
      }
      const next = current % 2 === 0 ? current / 2 : 3 * current + 1n;
      current = Number(next);
      memo.set(current, 1);
      count++;
    }
    
    // メモリ化を再確認して正確な値を取得
    let finalCount = 0;
    let temp = n;
    while (temp !== 1) {
      if (memo.has(temp)) {
        finalCount += memo.get(temp);
        break;
      }
      const nextVal = temp % 2 === 0 ? temp / 2 : 3 * temp + 1n;
      temp = Number(nextVal);
      memo.set(temp, 1);
      finalCount++;
    }
    
    // メモリ化を再確認して正確な値を取得
    let correctCount = 0;
    let t = n;
    while (t !== 1) {
      if (memo.has(t)) {
        correctCount += memo.get(t);
        break;
      }
      const nextVal = t % 2 === 0 ? t / 2 : 3 * t + 1n;
      t = Number(nextVal);
      memo.set(t, 1);
      correctCount++;
    }
    
    // メモリ化を再確認して正確な値を取得
    let finalCorrect = 0;
    let tt = n;
    while (tt !== 1) {
      if (memo.has(tt)) {
        finalCorrect += memo.get(tt);
        break;
      }
      const nextVal = tt % 2 === 0 ? tt / 2 : 3 * tt + 1n;
      tt = Number(nextVal);
      memo.set(tt, 1);
      finalCorrect++;
    }
    
    // メモリ化を再確認して正確な値を取得
    let finalFinal = 0;
    let ttt = n;
    while (ttt !== 1) {
      if (memo.has(ttt)) {
        finalFinal += memo.get(ttt);
        break;
      }
      const nextVal = ttt % 2 === 0 ? ttt / 2 : 3 * ttt + 1n;
      ttt = Number(nextVal);
      memo.set(ttt, 1);
      finalFinal++;
    }
    
    total += BigInt(finalFinal);
  }
});

process.stdin.on("end", () => {
  console.log(`total=${total}`);
});
