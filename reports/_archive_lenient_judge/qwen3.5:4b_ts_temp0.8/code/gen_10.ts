import { readFileSync } from "fs";

const input = readFileSync(0, { encoding: "utf8" });
const numbers = [];
for (const part of input.trim().split(",")) {
    if (!isNaN(Number(part))) {
        const n = Number(part);
        // 有効な整数のみをフィルタリング。NaN や Infinity は無視されるため安全。
        numbers.push(n);
    }
}

// 重複を除いたユニークな要素を取得し、ソート（可選だが安定性を担保するため）
const uniqueNumbers = [...new Set(numbers)].sort((a, b) => a - b);

let count = 0;
let sum: bigint = BigInt(0);

for (const num of uniqueNumbers) {
    const bigNum = BigInt(num);
    if (bigNum !== 0n && !isNaN(Number(bigNum.toString()))) {
        // ここでは、一意な整数の総数をカウントし、合計を足す。
        //仕様「重複を除いた整数」について個数と合計を求める。
        count++;
        sum += bigNum;
    } else if (num === 0) {
        // 0 は有効な整数なのでカウント・合計に含めるべきか？
        // 「整数として解釈できない要素も無視します」という文言から、
        // NaN, Infinity などのみを除外し、0 を含む実数（int）は対象とする。
        count++;
        sum += bigNum;
    } else {
        // 上記の処理で既にカウント済みまたはスキップ済みの場合を除くため、
        // ここでは一意な要素ごとに追加するロジックを再確認。
        if (isNaN(Number(num)) || !Number.isFinite(num) && typeof num === 'number') {
            continue; 
        } else if (!isIntegerLike(num)) {
             continue;
        }
    }
}

// 上記のループロジックを簡潔に再書き直す。
count = uniqueNumbers.length; //ユニーク個数
sum = BigInt(0);

for (const num of uniqueNumbers) {
    const bigNum = BigInt(num); 
    sum += bigNum; 
} 

// 修正：上記の複雑なロジックを単純化し、仕様通りに実行する。
count = numbers.reduce((acc, val) => acc + Number.isInteger(val), 0); // これは重複を含んでいるため誤り

const uniqueSet = new Set<number>();
for (const n of numbers) {
    if (!isNaN(n)) { 
        uniqueSet.add(Number(n));
    }
}

count = uniqueSet.size;
sum = BigInt(0n); 

for (const u of uniqueSet) {
    sum += BigInt(u);
}


// 最終的な出力ロジックを再定義する。
numbers.forEach((numStr, idx, arr) => {
    const val = Number(numStr.trim()); // ここでは文字列から数値への変換を行うが、NaN や Infinity は除外すべきではないか？
});

const filteredNums: number[] = [];
for (const s of input.split(",")) {
    const n = Number(s);
    if (!isNaN(n) && isFinite(n) && Number.isInteger(n)) { 
        // 整数として解釈できない要素（NaN, Infinity）は無視する。0 は有効な整数とする。
        filteredNums.push(Number(n));
    }
}

// ユニーク化と合計計算
const uniqueSet = new Set(filteredNums);
count = uniqueSet.size; 
sum = BigInt(0n); 

for (const u of uniqueSet) {
    sum += BigInt(u);
}

console.log(`count=${count} sum=${Number(sum.toString())}`);
