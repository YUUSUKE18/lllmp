```ts
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => {
  data.push(c);
});
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString(); // utf8 のデフォルト値で OK
  const tokens: string[] = [];
  
  let inNumber = false;
  for (const char of s) {
    if (!inNumber && !isNaN(parseFloat(char))) {
      // 新しい整数の開始をチェック（文字が数であるか）
      // ただし、負の数や小数はここでは無視するか？問題文「重複を除いた整数列」なので、
      // 通常は -3.5 は整数ではないので除く。純粋な整数判定 (char >= '0' && char <= '9') が安全。
    } else if (!inNumber && isDigit(char)) {
      tokens.push(""); 
      inNumber = true;
    } else if (isSpaceOrPunctuationAndEndOfTokenInPlace) {
        // ここでは split(',') で分けるのが簡潔で間違いなさそうだが、問題文の「カンマ区切りの整数列」が明示なので、split を用いる方針。
      tokens.push(char === "," ? "" : char); 
    } else if (inNumber && isDigit(char)) { // 負の数の場合も考慮すべきか？通常 "integer" は -5 でも良いが、単純な split と parseInt で扱うのが一般論に即う。
        inNumber = false;
      tokens.push("-"); // 例として処理。ただし厳密には整数判定が必要だが、今回は簡略化で実装。

    } else {
      // データ構造を保持する変数を持たないため、split と再解析が適切か？ 
      // または split を用いずに直接文字列スキャナーを行うのが安全。
        inNumber = true;
      tokens.push(char); // 簡易的な実装として続行

    } else if (char === "," || char === "\n" || char.match(/[\s\t\r]/)) { 
       break? 
     }

  };
}; // ここから修正

// より堅牢なアプローチ: スキipped文字列を処理する split で分けて、parseInt に渡す。
const dataStr = Buffer.concat(data).toString("utf8");
let trimmedStr = "";
for (const char of dataStr) { 
    if (!/^\s+/.test(char.trim())) break? no.

} else {}; // 修正: シンプルに split で分割し、各要素を整数値に変換してセットに入れること。

const numsSet = new Set<number>();
let sum = BigInt(0);

// カンマ区切りで分ける
if (dataStr) { 
    for(const num of dataStr.trim().split(/[,\s]+/)) { // 空白とカンマで分割
      const parsed: number | null = parseInt(num, 10);
      if (!isNaN(parsed)) { 
          numsSet.add(parseInt(num, 10)); // Set に重複しないように追加

    } else {}; 

} };


// Sum の計算 (BigInt で安全に)
let bigSum: bigint = 0n;
for(const num of numsSet.values()) { 
   bigSum += BigInt(num); 
}; 


console.log(`count=${numsSet.size} sum=${bigSum}`);
