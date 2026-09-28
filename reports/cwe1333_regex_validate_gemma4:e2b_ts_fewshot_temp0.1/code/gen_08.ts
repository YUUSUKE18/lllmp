const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];

rl.on('line', (line) => {
  lines.push(line.trim());
});

rl.on('close', () => {
  let validCount = 0;
  for (const line of lines) {
    // 末尾のカンマを許容しつつ、カンマ区切りの整数列が存在するかを判定する
    // 正規表現で、カンマで区切られた数字の塊が存在するかを確認する
    // 許容されるパターン: 0個以上のカンマ、数字、0個以上のカンマ
    // 厳密には「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する必要がある。
    // 例: "1,2,3" -> OK
    // 例: "1," -> OK (末尾のカンマは許容)
    // 例: "," -> NG (数字列がない)
    // 例: "abc" -> NG (数字以外が含まれる)

    // 1. 行が空でないことを確認
    if (line.length === 0) {
      continue;
    }

    // 2. 数字とカンマのみで構成されているか、かつ、少なくとも1つの数字が含まれているかを確認する
    // 正規表現: ^[0-9,]*$ は数字とカンマのみで構成されていることを確認
    // さらに、数字が少なくとも1つ含まれていることを確認する
    const matches = line.match(/^[0-9,]*$/);

    if (matches) {
      // 数字とカンマのみで構成されている場合、カンマで区切られた数字列が存在するか確認する
      // カンマで区切られた数字列が存在するためには、少なくとも1つの数字が含まれている必要がある。
      // "1,2" -> OK
      // "1," -> OK
      // "," -> NG (数字がない)
      // "" -> (既に除外済み)

      // カンマで区切られた要素を分割し、空でない要素があるかを確認する
      const parts = line.split(',');
      let hasNumber = false;
      for (const part of parts) {
        if (part.trim() !== "") {
          const num = parseInt(part.trim(), 10);
          if (!isNaN(num)) {
            hasNumber = true;
          }
        }
      }

      if (hasNumber) {
        validCount++;
      }
    }
  }

  console.log(`valid=${validCount}`);
});
