import { readFileSync } from "fs";

const input = readFileSync(0, "utf8");
const lines = input.split("\n");

let count = 0;
for (const line of lines) {
  // 前後の空白を削除し、空行を確認する
  const trimmedLine = line.trim();
  if (trimmedLine === "") {
    continue;
  }

  // 数字とカンマ以外が含まれているかチェック（正規表現：文字列に [^0-9,] が含まれていない）
  if (/[^0-9,]/.test(trimmedLine)) {
    continue;
  }

  // カンマ区切りかどうか確認（1 つ以上の数字がカンマで区切られているか）
  // 末尾のカンマも許容するので、分割した部分に「空文字列」が含まれてはいけない
  const parts = trimmedLine.split(",");
  
  // すべてが整数であることと、空でないことを確認
  const isValid = parts.every((part) => {
    // 数式として有効な形式（ leading/trailing whitespace を含み得るため再トリム）
    if (part.trim() === "") return false;
    return /^\d+$/.test(part);
  });

  if (isValid) {
    count++;
  }
}

console.log(`valid=${count}\n`);
