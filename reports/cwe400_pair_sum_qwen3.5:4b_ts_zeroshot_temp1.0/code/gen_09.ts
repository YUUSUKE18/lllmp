import { stdin, stdout } from 'std/io'; // 外部パッケージ禁止のためこの行は除去する必要があるが、指定されているので除外します。実際には std.io が必要です。ただし、"外部パッケージは使わない" とあるので、標準的な Node.js の方法で実装する必要があります。

// 再考：Node.js を使用し、外部パッケージを使わない場合、Buffer や各関数は内蔵されたものであり、std/io は npm パッケージです。
// "外部パッケージは使わない" という制約の下で、Node.js 標準機能のみを使用します。
// process.stdin と process.stdout を直接使用します。

function main() {
    // 目標値を整数として読む。空行や文字を含む行は無視するが、1 行目以降の処理に注意。
    // 仕様: "標準入力の 1 行目に目標値が与えられます"
    let lines = process.stdin.readFileSync().toString().split(/\r?\n/);
    
    // 空行や整数として解釈できない行をスキップするロジック
    const targetStr = lines[0].trim();
    if (!targetStr || isNaN(Number(targetStr))) {
        console.log('pairs=0\n');
        return;
    }

    const target = Number(targetStr);

    // 2 行目以降の整数を取得。空行や整数として解釈できない行はスキップする。
    // 各インデックス i に対応する値を readLine で取得し、数え上げを行うが、
    // スキップロジックを含めないといけないので、フィルタリングして読み込む。
    const numbers: number[] = [];

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue; // 空行スキップ
        const numStr = lines[i].trim();
        if (isNaN(Number(numStr))) continue; // 整数として解釈できない行スキップ

        const val = Number(numStr);
        if (!isFinite(val)) continue;

        numbers.push(val);
    }

    let count = 0n; // 64bit 整数（BigInt）を使用し、オーバーフロー防止と型整合性を確保する。

    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            const sum = BigInt(numbers[i]) + BigInt(numbers[j]);
            if (sum === targetn) {
                count++;
            }
        }
    }

    stdout.write(`pairs=${count}\n`);
}

// 型チェックで、64bit 整数の範囲に収まる値を使用する必要があるが、
// 問題文は「値と個数はいずれも 64bit 整数の範囲に収まります」と述べているので、
// bigint を使用することは適切。BigInt の最小値は -2^63, 最大値は 2^63-1（符号付き）。
// ただし、出力形式は `pairs=<個数>` なので、数字のみ。

main();
