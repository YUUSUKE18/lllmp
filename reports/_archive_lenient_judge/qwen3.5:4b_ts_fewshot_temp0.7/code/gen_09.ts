const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  
  // 空でない整数のセットと合計を計算
  let sum = BigInt(0);
  new Set<number>();

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    const n = parseInt(token, 10);
    if (Number.isNaN(n) || isFinite(n) === false) continue; // NaN や Infinity を無視
    
    let num: number | bigint;
    // BigInt で計算するため、数字が大きすぎる場合は自動で昇格させる必要があるが
    // 仕様は「合計は 64bit 整数の範囲に収まる」とあるので、通常の Number が扱えるか確認しつつ処理する。
    // ただし、JavaScript の Number は ±9e15 (2^53) を正確に表現できないため、
    // セットとカウントには number で OK（重複を除く個数）、合計は BigInt として計算して出力する必要があるかもしれない。
    // しかし、問題文の「64bit 整数」は signed int の範囲を指す可能性が高い (2^53 を超える値も含まれる)。
    
    if (!Number.isFinite(n)) continue;

    const setNum = n as number | bigint;
    new Set<number>().add(setNum); // セットに追加
    
  }
  
  // 再計算：Set に重複を除いた数字を格納し、合計を計算
  let uniqueNumbers: (number | bigint)[] = [];
  const seen = new Set<string>();

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    const n = parseInt(token, 10);
    if (Number.isNaN(n) || !isFinite(n)) continue; 
    
    // BigInt に変換して扱うようにする（数値が大きい場合や精度が必要な場合）
    let val: bigint | number = Number(BigInt(Number.toString(typeof n === 'number' ? n : parseInt(token, 10)));

    if (seen.has(val.toString())) {
      continue; // すでに追加されているのでスキップしない。ただし、重複を除いた個数も計算する必要があるため、Set の管理が必要
    } else {
      seen.add(val.toString());
      uniqueNumbers.push(val);
      
      sum += val as bigint;
    }

  }

  console.log(`count=${uniqueNumbers.length} sum=${sum}`);
});
