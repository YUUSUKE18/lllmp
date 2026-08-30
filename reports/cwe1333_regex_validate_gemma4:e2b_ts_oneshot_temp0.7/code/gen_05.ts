let validCount = 0;
let inputLines = "";

process.stdin.setEncoding("utf8");

process.stdin.on("data", (data: string) => {
  inputLines += data + "\n";
});

process.stdin.on("end", () => {
  const lines = inputLines.trim().split('\n').map(line => line.trim());
  let validLines = 0;

  for (const line of lines) {
    if (line === "") {
      continue; // 空行は妥当ではない（ただし、仕様上は「妥当な行数」を数えるため、空行は妥当ではないと判断する）
    }

    // 末尾のカンマを除去して、カンマで区切られた数字列が存在するか確認する
    const trimmedLine = line.replace(/,$/g, '');

    if (trimmedLine.length === 0) {
      // 元がカンマのみだった場合（例: "," や ",,"）は妥当ではない
      continue;
    }

    // カンマで区切られた要素を取り出す
    const parts = trimmedLine.split(',');

    // 1個以上の数字列がカンマで区切られて並んでいるか確認する
    // 各要素が数字のみで構成されているか、または数字列として解釈できるかをチェックする
    let isValid = true;
    for (const part of parts) {
      if (part.length === 0) {
        // カンマが連続している場合（例: "1,,2"）は妥当ではない
        isValid = false;
        break;
      }
      // 数字とカンマ以外を含む行は妥当ではない、という制約をより厳密に解釈するため、
      // ここでは「カンマで区切られた要素がすべて整数である」ことを確認する。
      // 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
      // これは、各区切りが数字列であることを意味する。
      if (!/^\d+$/.test(part)) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      validLines++;
    }
  }

  console.log(`valid=${validLines}`);
});
