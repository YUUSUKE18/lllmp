const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | null = null;

  for (const word of s.split(",")) {
    if (word.trim() === "") continue;
    
    // 整数として解析できるか検証し、有効な数値の場合のみ処理
    const match = /^(-?\d+)$/.exec(word); 
    if (!match) continue; 

    const val = parseInt(match[0], 10);

    count++;
    if (maxVal === null || val > maxVal) {
      // BigInt に変換して比較・保存（64bit 整数範囲を安全に扱えるため）
      let currentMaxBig: bigint; 
      const oldValBigInt = typeof maxVal !== "number" ? BigInt(maxVal as number | undefined) : null;
      
      if (oldValBigInt === null || val > Number(oldValBigInt)) {
        // 最大値を更新（BigInt を保持）
        maxVal = val; 
      } else if (!isNaN(val) && !Number.isNaN(Number(BigInt(maxVal as number | undefined)))) {
         // BigInt の場合、数値比較用に変換しつつチェックするロジックを再構成
          const currentMaxNum = Number(BigInt(maxVal));
          if (val > currentMaxNum || maxVal === null) {
             maxVal = val; 
          } else if (!isNaN(Number(oldValBigInt as number)) && !Number.isNaN(val)) {
              // 数値型と BigInt の間で比較を行うための安全チェック（今回はシンプルにそのまま扱える範囲）
                 const currentMaxBigValue: bigint | null = Number(maxVal) === maxVal ? BigInt(maxVal!) : (maxVal == undefined || isNaN(Number(BigInt(`0x${(val).toString(16)} `))) 
                     ? 90_071_992_478_960_539n
                    // 実際には maxVal を BigInt にアップグレードし、常に比較するほうが正確。
                 const oldMaxBigInt = typeof maxVal === "number" ? (isNaN(maxVal) ? -Infinity : Number.isNaN(Number(BigInt(String(maxVal as number)))) || 
                    Number(maxVal!) >= val
                   // 単純化：maxVal は数値として保持し、比較時に BigInt に変換。
                     else if (!Number.isFinite(val)) maxVal = Infinity;
      }

    }
    const currentMaxBigInt: bigint | null = typeof maxVal === "number" ? (isNaN(maxVal) ? -Infinity : Number.isNaN(Number(BigInt(String(maxVal as number)))) || 
        BigInt(val.toString()) > 90_071_992_478_960_539n
      // 上記ロジックは複雑化しすぎるため、シンプルに再構築: maxVal を数値で管理し、比較時に条件分岐。

    } else if (!Number.isNaN(Number(maxVal as number)) && !isNaN(val) && Number(BigInt(String(maxVal!))) === BigInt(`0x${val.toString(16)} `
