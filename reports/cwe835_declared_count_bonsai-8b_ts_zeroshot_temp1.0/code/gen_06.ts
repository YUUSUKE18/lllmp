const line1 = process.stdin.readline();
const line2 = process.stdin.readline();

const count = 0;
let sum = 0;

// 第1行から個数を読み、整数のみを処理
if (line1) {
  const numStr = line1.trim();
  if (/^-?\d+$/.test(numStr)) {
    count = parseInt(numStr);
  }
}

// 前後の空行や非整数を無視
let line = process.stdin.readline();
while (line) {
  const trimmed = line.trim();
  if (/^-?\d+$/.test(trimmed)) {
    sum += parseInt(trimmed);
  }
  line = process.stdin.readLine();
}

// 実際に読み取られた整数のみを処理
// countとsumを正しく反映するように修正
// countは最初の行から取得する代わりに、実際に取得された数 only
// sumは後続の行から取得する代わりに、実際に取得された数 only
// しかし、仕様によると "実際に読み取れた整数の個数" をcountと "実際に読み取れた合計"をsumと出力する
// これにより、数の一致が保証されていない場合でも、正しく出力できるように修正
const actualCount = 0;
const actualSum = 0;

// 空行を無視して、数を読み取る
let numStr: string;
do {
  numStr = process.stdin.readline().trim();
} while (numStr === '');

if (/^-?\d+$/.test(numStr)) {
  actualCount++;
  actualSum += parseInt(numStr);
}

// 空行を無視して、数を読み取る
do {
  numStr = process.stdin.readline().trim();
} while (numStr === '');

if (/^-?\d+$/.test(numStr)) {
  actualSum += parseInt(numStr);
}

console.log(`count=${actualCount} sum=${actualSum}`);
