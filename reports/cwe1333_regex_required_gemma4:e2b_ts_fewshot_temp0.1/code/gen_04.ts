const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  let validLines = 0;
  const regex = /^(\d+(,\d+)*)\s*$/;

  for (const line of lines) {
    // 行の前後の空白を無視するため、trim()を使用
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      // 空行は妥当ではない
      continue;
    }

    // 正規表現で判定: 1個以上の数字とカンマの組み合わせ、および末尾のカンマの許容
    // 厳密には「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する必要がある。
    // 例: "1,2,3" はOK。末尾カンマもOK。
    // 正規表現の解釈:
    // ^\s* : 行頭の空白
    // (?: \d+(,\d+)* ) : 1つ以上の数字とカンマのパターン（例: 1,2,3 または 1,2）
    // (?:,\s*|\s*$) : カンマと空白、または行末
    // この課題の要件を最も厳密に満たすのは、数字とカンマのみで構成され、少なくとも1つの数字が含まれていること。

    // 妥当性の判定ロジックを再考:
    // 1. 空行はNG。
    // 2. 数字とカンマ以外を含む行はNG。
    // 3. 1個以上の数字列がカンマで区切られていること。

    // 正規表現で「数字とカンマのみ」かつ「少なくとも1つの数字がある」ことを確認する。
    // 許容されるパターン: 数字とカンマのみで構成され、数字が少なくとも1つある。
    // 例: "1,2,3", "1,2,", "1"
    // 否定されるパターン: "a,b", "1,a", "1,2,3,4" (これはOKだが、数字とカンマ以外が含まれるとNG)

    // 課題の「妥当とは、1 個以上の数字列がカンマで区切られて並んでいることです。末尾のカンマは許容します。」
    // これは、行が数字とカンマのみで構成され、少なくとも1つの数字が含まれていることを意味すると解釈する。

    // 1. 数字とカンマのみで構成されているか？
    const onlyDigitsAndCommas = /^[0-9,]*$/.test(trimmedLine);

    if (!onlyDigitsAndCommas) {
      continue; // 数字とカンマ以外を含む行はNG
    }

    // 2. 少なくとも1つの数字が含まれているか？
    const containsDigit = /\d/.test(trimmedLine);

    if (containsDigit) {
      // 3. 1個以上の数字列がカンマで区切られているか？
      // 1. カンマで区切られた部分を分割し、空でない要素が1つ以上あるか確認する。
      // 末尾のカンマは許容されるため、末尾のカンマを削除してから分割する。
      const parts = trimmedLine.replace(/,$/, '').split(',');
      
      // 妥当なのは、分割された要素が1つ以上存在し、かつその要素が数字のみで構成されている場合。
      // ただし、上記1.で既に数字とカンマのみであることを確認済み。
      // 1個以上の数字列が区切られている = parts.length >= 1 かつ、その中で数字が含まれている。
      
      // 既に containsDigit が true なので、parts.length >= 1 であれば十分。
      // 例: "1" -> parts=["1"]. length=1. OK.
      // 例: "1,2," -> trimmedLine.replace(/,$/, '') -> "1,2". parts=["1", "2"]. length=2. OK.
      // 例: "," -> containsDigit=false (スキップされる)
      
      if (parts.length >= 1) {
        validLines++;
      }
    }
  }

  console.log(`valid=${validLines}`);
});
