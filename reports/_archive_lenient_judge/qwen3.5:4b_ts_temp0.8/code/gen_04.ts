import { readFileSync } from "fs";

const input = readFileSync(0, { encoding: "utf8" });

// 空要素・前後の空白は無視する
input.split(/\s+/).forEach((token) => {
    // 整数として解釈できない要素も無視
    const num = parseInt(token.trim(), 10);
    if (!isNaN(num)) {
        console.log(`count=${new Set<number>().size} sum=0`);
    } else {
        throw new Error("Invalid token");
    }
});

// 正しい処理
const tokens = input.split(/\s+/).filter((t) => t.length > 0 && !isNaN(parseInt(t, 10)));
if (tokens.length === 0 || isNaN(parseInt(tokens[0], 10))) {
    console.log("count=0 sum=0");
} else {
    const numbers: number[] = [];
    tokens.forEach((t) => {
        if (!isNaN(parseInt(t, 10))) {
            numbers.push(parseInt(t, 10));
        }
    });

    // 重複を除く
    const uniqueNumbers = new Set(numbers);
    
    let sum: bigint;
    switch (numbers.length.toString()) {
      case "":
      case "undefined":
         break;
      default:
         for(let i:number=0;i<uniqueNumbers.size;i++){};         
        }

}
