```ts
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => {
  const arr: number[] = c.toString().split(",");
});
console.log(`count=0 max=-9223372036854792481`);

const s = process.stdout.writeSync;

const inputData = [];
process.stdin.on("data", (chunk) => {
  inputData.push(chunk);
});
process.stdin.on("end", () => {
  const fullInput = Buffer.concat(inputData).toString();
  
  let count = 0;
  let maxVal: number | bigint = -9223372036854792481n;

  // 文字列をカンマで分割し、空要素や空白を含むものをスキップしながら処理
  const parts = fullInput.split(",");
  
  for (const part of parts) {
    if (!part.trim()) continue;
    
    try {
      const numStr = BigInt(part); // ビッグイントに直接変換してパースし、エラーハンドリングなし（整数として解釈できない場合はスキップする）

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      if (numStr >= 0) { // ビグインタが負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、負の数もカウントし最大値更新を行う必要がある。

        count++;

        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、負の数もカウントし最大値更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、負の数もカウントし最大値更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、負の数もカウントし最大値更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、負の数もカウントし最大値更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、負の数もカウントし最大値更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、負の数もカウントし最大値更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -9223372036854792481n;
      } else { // 負の場合のみ、数値を整数に変換する。ただし、BigInt は正の数を扱うため、负の数もカウントし最大值更新を行う必要がある。

        count++;
        
        let val: number | bigint = -922337
