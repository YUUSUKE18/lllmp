const data: string[] = [];
process.stdin.on("data", (c: Buffer) => {
  // エラーハンドリング（例：Ctrl+C で終了した場合など）を無視してデータを蓄積する
});
process.stdin.on("end", () => {
  const content = Buffer.concat(data).toString("utf8");
  let validCount = 0;

  for (const line of content.split(/\r?\n/)) {
    const trimmedLine = line.trim();
    if (trimmedLine === "") continue; // 空行は無視（妥当とみなさずカウントしない）

    try {
      // 前後の空白を削除した文字列が、整数（オプションのマイナスを含む）、カンマのみから構成されているかチェックする。
      // Regex: [-]?[0-9]+(\s*[,]\s*[0-9]+)*
      // ただし、「数字とカンマ以外を含む行は妥当ではない」ため、厳密なマッチが必須。
      // 末尾のカンマは許容するため、マッチパターンは「整数列が少なくとも 1 つあること」を指定。
      // 具体的な正規表現: ^\s*(-?\d+)(,\s*-?\d+)*$ は空行（trim 後に空でないが数字なし）を避けるため注意が必要。
      // ここでは、trim が成功し、文字列が「数字」、「カンマ」のみからできているかを確認する。
      const re = /^[-]?\d+(,\s*[-]?\d+)*$/;
      if (re.test(trimmedLine)) {
        validCount++;
      }
    } catch {
      // 例外が発生した場合はカウントしない（本来は try/catch を不要にできるが、安全確保のため）
    }
  }

  console.log(`valid=${validCount}`);
});
