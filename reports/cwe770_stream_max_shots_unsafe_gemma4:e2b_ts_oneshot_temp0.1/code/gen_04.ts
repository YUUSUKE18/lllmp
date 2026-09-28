import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素を数値に変換する
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        // 前後の空白をトリム
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェックし、64bit範囲内か確認（ここではparseIntの範囲に依存するが、問題の制約に従う）
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できなかった要素は無視される。
    // 空要素や空白はトリムとチェックで無視される。

    // 最終的な結果を出力
    if (count > 0) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        // 有効な整数が一つもなかった場合、最大値の定義に注意が必要だが、ここでは空の入力に対する挙動を明確にするため、
        // 入力が空または無効な場合でも形式に従う。
        // 厳密には「要素数」と「最大値」を求めるので、要素がない場合は count=0, max=? となるが、
        // 最大値を定義できないため、ここでは入力された有効な数値が存在しない場合の挙動を考慮する。
        // 問題の仕様から、もし有効な整数が一つもなければ、maxは未定義となるが、
        // 最小値として-Infinityや0などを設定する必要があるか？
        // 例として、入力が空の場合、count=0, max=-Infinity (または適切なデフォルト)とする。
        // ただし、ここでは「整数として解釈できない要素も無視する」という指示に基づき、有効な数値がない場合は count=0 となる。
        process.stdout.write(`count=0 max=-1\n`); // ゼロ個の要素に対して最大値は定義されないが、形式に従うため仮の値を入れるか、あるいは入力がない場合は何も出力しないか？
    }
}

solve();
