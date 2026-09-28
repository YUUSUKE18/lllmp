```ts
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => {
    try {
        // バッファを追加して、一度に全入力を読み取るための再帰的な読み込みロジックを省略するため
        // ここでは「data」配列にバッファを加算する。ただし、複数の read 呼び出しがある場合の連結が必要だが、
        // シンプルなアプローチとしてデータを受け付けた時点で結合処理を行うのが一般的であるが、
        // Node.js では読み込まれたデータを即座に処理して出力できるような仕組みを構築すべきである。
        
    } catch (e) {}
});

// 入力の収集と処理の再考：Node.js の標準入力を読み込むための一般的なアプローチ
const input: string[] = [];
process.stdin.on("data", () => { /* データが来る */ }); // この例では、一時的なバッファを管理するのではなく、一度に全てのデータを取得する方法を使うこともできる

// シンプルな方法として、「input' 配列にデータを加える代わりに、単一のストリームから全文字を取得し
// その後に整数の解析を行う」ようにするのが最も効率的である。

const data: Buffer[] = []; // データを格納するバッファリスト

process.stdin.on("data", (chunk) => {
    data.push(chunk);
});

process.stdin.on("end", () => {
  let maxVal = null; // JavaScript の number が 64bit を扱える（float/double）
  
  const fullInput = Buffer.concat(data).toString();
  const lines: string[] = [];
    if (line.trim() === "") continue;

if (!maxVal) {
      } else if (n > maxVal) {
        maxVal = n;
}
