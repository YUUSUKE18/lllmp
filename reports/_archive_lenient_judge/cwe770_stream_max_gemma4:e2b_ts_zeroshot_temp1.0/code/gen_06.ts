import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    crlfDelay: Infinity
});

let inputData = '';

rl.on('line', (line) => {
    inputData += line + '\n';
});

rl.on('close', () => {
    // 入力されたデータを処理
    const parts = inputData.trim().split(',');

    if (parts.length === 0 || parts[0] === '') {
        // 入力が空の場合は何も出力しない（または仕様に基づいた適切なエラー処理。ここでは何も出力しないとする）
        return;
    }

    let count = 0;
    let maxValue = -Infinity;
    let isValidInput = true;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === '') continue;

        // 整数として解釈可能か確認し、64bitの範囲内か確認する
        const num = Number(trimmedPart);

        // isFiniteで数値であり、整数であること、そして64bitの範囲内であることを確認する
        if (Number.isInteger(num) && num >= -2**63 && num <= 2**63 - 1) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        } else {
            // 整数として解釈できない要素は無視する
            isValidInput = false; // 厳密には、無視したことを示す必要はないが、データセットの整合性を保つために注意
        }
    }

    // 結果を出力
    if (count > 0) {
        console.log(`count=${count} max=${maxValue}`);
    } else if (parts.length > 0) {
        // データが与えられたが有効な整数が一つもなかった場合。
        // 仕様に厳密に従うため、count=0, max=-Infinity などとするのが適切だが、ここでは単に何も出力しないか、0を出すことにする。
        // 要素が1つ以上あったが無視された場合、カウントは0になるため、count=0 を出力するのが自然。
        console.log(`count=0 max=-Infinity`); // 少なくとも最大値の定義が必要だが、全ての要素が除外された場合はこれとする
    }

    rl.close();
});
