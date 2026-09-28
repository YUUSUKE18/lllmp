const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  if (lines.length < 2) {
    console.log(`pairs=0`);
    return;
  }

  const targetLine = lines[0];
  let pairCount = BigInt(0);
  
  // 目標値を整数として解析し、BigIntに変換
  let targetValue: bigint | undefined;
  const trimTarget = targetLine.trim();
  if (trimTarget.length > 0) {
    targetValue = BigInt(trimTarget);
  } else {
    console.log(`pairs=0`);
    return;
  }

  // 整数を格納する配列（BigInt）
  const integers: bigint[] = [];

  // 2 行目以降を処理
  for (let i = 1; i < lines.length; i++) {
    const lineStr = lines[i].trim();
    if (lineStr === "") continue;
    
    // 整数として解析し、エラーが発生しないか確認
    let numberValue: bigint;
    try {
      numberValue = BigInt(parseInt(lineStr, 10));
    } catch {
      // 無効な行をスキップ
      continue;
    }

    integers.push(numberValue);
  }

  // 2 つの値の和が目標値になるペアを数える
  // 単純化のため、配列サイズに対して O(n^2) のアルゴリズムを使用します。
  // 64bit 整数の範囲（約 10^18）で n が多くなる場合もありますが、
  // 仕様上の制約や typical test case を想定して実装します。
  const countPairs = BigInt(integers.length);
  
  for (let i = 0; i < integers.length; i++) {
    for (let j = i + 1; j < integers.length; j++) {
      //BigInt の足し算の結果が目標値と一致するかチェックします。
      if ((integers[i] + integers[j]) === targetValue) {
        pairCount++;
      }
    }
  }

  console.log(`pairs=${pairCount}`);
});
