import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、前後の空白や空文字列をフィルタリングして整数配列にする
    const parts = input.split(',');
    const numbers: number[] = [];

    for (const part of parts) {
        // 空文字列や空白のみの要素は無視される（split(',')の結果が空文字列になる場合など）
        if (part.trim() === "") continue;
        const num = parseInt(part.trim(), 10);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    const count = numbers.length;
    let maxValue: number = -Infinity;

    if (count > 0) {
        for (const num of numbers) {
            if (num > maxValue) {
                maxValue = num;
            }
        }
    } else {
        // 要素が一つもなかった場合の最大値の扱い。問題文の制約から、入力が空の場合の具体的な出力形式は指定されていないが、
        // 64bit整数の範囲に収まるという点と、要素数と最大値を求めることから、0個の場合は最大値を定義しにくい。
        // ただし、ここでは「読み込んだ整数列」に基づき処理を行うため、要素がない場合は最大値の計算をスキップする（または適切なデフォルト値を設定する）。
        // 厳密に仕様に従い、入力された数値のみに基づいて計算する。もし空なら max は未定義だが、ここでは -Infinity のままにするか、あるいは問題文の意図を推測して 0 とするなどの判断が必要になるが、
        // 単純に最大値を求めるのであれば、要素がない場合は通常はエラーまたは特定の値となる。
        // 今回は「読み込んだ整数列」に基づいて処理するため、count=0 の場合は max をどうするか？
        // 数値が存在しないため、ここでは count=0 の場合は maxValue を定義せずに出力するか、あるいは仕様に合わせるために 0 とする（もし入力が空なら最大値も存在しない）。
        // ただし、例題の形式に従うため、要素がない場合は max は計算されないことになる。今回は「読み込んだ整数列」を基にするため、count=0 ならば maxValue を定義できない。
        // ここでは、数値が存在する場合のみ最大値を設定する。もし count=0 なら、最大値は存在しないと見なすか、あるいは入力が空なら max=0 と仮定する（安全策）。
        maxValue = 0; // 空のリストの場合、最大値は 0 とする（最も安全なデフォルト）
    }

    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
