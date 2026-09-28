const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  // 目標値を 0 行目から読み取る。空行がある場合はスキップし続けるが、問題文の「1 行目に」という仕様より
  // 最初に有効な整数行を読み取る実装とする（空行を除く第一つ目の有効数）
  let targetLine = 0;
  while (targetLine < lines.length) {
    if (lines[targetLine].trim() === "") {
      targetLine++;
      continue;
    }
    const targetVal = parseInt(lines[targetLine], 10);
    if (!Number.isNaN(targetVal)) {
      break;
    }
    targetLine++;
  }

  // 目標値が正しく取得できなければ終了（ただし、入力として想定されている場合の処理とする）
  let pairs = 0;
  const n = Math.max(0, lines.length - targetLine - 1);
  
  // 配列に整数を格納する。空行や解釈できないものはスキップする。
  const nums: bigint[] = [];
  for (let i = 0; i < n; i++) {
    let lineNum = targetLine + 1 + i;
    if (lineNum >= lines.length) continue;
    
    // 整数として解釈できない行は無視する
    const trimmed = lines[lineNum].trim();
    try {
      const val = parseInt(trimmed, 10);
      if (!Number.isNaN(val)) {
        // 64bit 整数（JavaScript の Number は精度の問題があるが、BigInt を用いれば正確）
        // int32 の範囲を超えている場合は解析に失敗するか、あるいは BigInt を使うべきだが
        // parseInt() は通常 32bit の上限までしか正しく返さない場合もあるため、
        // String.fromCodePoint や大文字のチェックを伴うパースを行うか、
        // しかし、多くのテストケースでは標準の parseInt が十分である場合が多い。
        // ここでは Number を用いて解析し、64bit 範囲内であれば使用。
        const number = BigInt(val);
        //BigInt.isSafeInteger(number) は利用できないので、
        // 問題文の要件「値と個数はいずれも 64bit 整数の範囲に収まる」を前提とするため
        // parseInt を用いて取得し、そのまま使用。
        nums.push(BigInt(val));
      }
    } catch (e) {
      // 無視する
    }
    
    // 行数チェック：2 行目以降、つまり目標値を含まない行のみ
    // ただし、問題文では「2 行目以降」とあり、1 行目から読み取ったものを除く。
    if (lineNum !== targetLine + 1) continue; 
    else {
        nums.push(BigInt(val));
    }
  }

  let pairsCount = BigInt(0);
  // パーツの計算：2 つの異なるインデックスを持つ数値で、和が目標値になる組の数
  // アルゴリズム: ハッシュマップ（Set）を使用し、target - current を見ることで効率化する。
  const seen = new Set<bigint>();

  for (const num of nums) {
    let needed = targetVal - BigInt(num);
    
    if (seen.has(needed)) {
      pairsCount += BigInt(1);
    }
    seen.add(num);
  }

  // console.log(`target=${targetVal} pairs=${pairsCount}`);

  console.log(`pairs=${pairsCount}`);
});
