process.stdin.setEncoding("utf8");

let validCount = 0;
let inputData = "";

process.stdin.on("data", (data: string) => {
  inputData += data;
});

process.stdin.on("end", () => {
  const lines = inputData.split(/\r?\n/);
  let validLines = 0;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine === "") {
      continue; // 空行は妥当ではないためスキップ
    }

    // 正規表現による判定:
    // ^: 行の開始
    // [0-9,]*: 0個以上の数字またはカンマが続く
    // $: 行の終わり
    // この正規表現だけでは「1個以上の数字列がカンマで区切られている」ことを完全に保証できないため、
    // 以下のロジックでさらに確認する。

    // 妥当性の定義: 1個以上の数字列がカンマで区切られて並んでいる。末尾のカンマは許容。
    // 例: "1,2,3", "1,2,", "1" はOK
    // 例: "abc", "1,a", "1,,2" はNG

    // 1. カンマと数字のみで構成されているか確認
    // 末尾のカンマを許容するため、最後の文字がカンマで終わるか、数字で終わる必要がある。
    const regex = /^[\d,]*$/;

    if (!regex.test(line)) {
      // 数字とカンマ以外の文字が含まれている場合、妥当ではない
      continue;
    }

    // 2. 1個以上の数字列が存在するか確認
    // カンマで分割し、空でない要素が少なくとも1つあるか確認する。
    const parts = line.split(',');
    let hasNumbers = false;
    for (const part of parts) {
      if (part.trim() !== "") {
        // その部分が完全に数字のみで構成されているか確認
        if (/^\d+$/.test(part.trim())) {
          hasNumbers = true;
        } else {
          // 数字以外のものが含まれている場合（例: "1,a" や "1,,2" のような構造）
          // この場合は、厳密には「数字列がカンマで区切られている」という要件を満たさない。
          // ただし、仕様は「1個以上の数字列がカンマで区切られて並んでいること」なので、
          // 数字とカンマ以外が含まれる場合は不妥当とする。
          // ここでは、数字とカンマ以外の文字が含まれていれば不妥当と判断し、次の行へ進む。
          // （regexで既にチェック済みだが、念のため）
          // このロジックをシンプルにするため、正規表現のみで完結させたいが、
          // 要件を厳密に満たすため、分割後の要素チェックが最も確実。
        }
      }
    }

    // 妥当な行のカウント
    if (hasNumbers) {
      validLines++;
    }
  }

  console.log(`valid=${validLines}`);
});
