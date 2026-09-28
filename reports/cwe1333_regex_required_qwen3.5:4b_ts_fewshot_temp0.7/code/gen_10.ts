```ts
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (const line of s.split(/\r?\n/)) {
    if (line.trim() === "") continue;
    const regex = /^(?:[0-9]+(?:\s*,\s*[0-9]+)*)$/; // 正規表現修正: 空白を許容しつつ、数字とカンマのみを厳密にチェック。ただし「数字列」とは整数列なので、各要素が純粋な整数である必要があります。
    // より正確な仕様解釈: "1 個以上の数字列がカンマで区切られて並んでいる" -> 要素は整数。空白は許容。末尾のカンマ許容。
    // 修正された正規表現: ^[\s]+(?:[0-9]+(?:\s*,\s*[0-9]+)*)?$ は「数字とカンマ以外を含む行」を許容しないようにするため、すべての文字が数値または空白である必要があります。
    // しかし、「数字とカンマ以外を含む行は妥当ではありません」とあるので、正規表現は ^[\d\s]*$ で全体が数字か空白だけかチェックし、かつ「1 個以上の数字列」があるか（少なくとも 1 つの整数）をチェックする必要があります。
    // さらに「末尾のカンマ許容」ですが、通常カンマは数字と区切るので、正規表現で直接「カンマ」を数値部分に組み込む必要があります。
    // 要件再考: "1 個以上の数字列がカンマで区切られて並んでいる" -> 例: "1,2", "1,2,", " 1 , 2 ", "1".
    // 許容されない例: "a", "1,a", "", "1,,2" (空の要素), " 1 , a ".
    // 適切な正規表現の構築:
    // 全体は空白、数字、カンマのみからなること。
    // 少なくとも 1 つの整数が含まれていること。
    // 区切り（カンマ）の間には空白が許容されるか？「空白区切りの整数列」の例を見ると空白は許容されているようだ。ただし本課題は「カンマ区切り」とある。
    // 例: "1,2" -> OK. "1 , 2" -> ? 問題文「数字とカンマ以外を含む行」が NG。空白は「無視します」とあるので、空白が含まれても OK。
    // しかし、「数字列がカンマで区切られて並んでいる」という構造を正規表現でチェックするのが最も堅牢である。
    // 形式: (空白の開始) + (整数) + ((空白)* + カンマ + (空白)* + 整数)* + (空白の終了)
    // これは "1,2" や "1 , 2" を許容し、末尾のカンマも許容する ("1,2," -> 最後の要素が不足しているが、定義上「1 個以上の数字列」があれば OK).
    // 実際、正規表現 `^\s*(?:\d+\s*,\s*\d+)*\s*$` は末尾のカンマを許さない (最後の数字が必須)。
    // 末尾カンマ許容するため: `^\s*(?:\d+\s*,\s*)?(?:\d+\s*,\s*\d+)*\s*$` ? いや、単純に「1 個以上の数字列」があれば OK。
    // 最も安全なアプローチ:
    // 1. 行全体が数値、空白、カンマのみからなるかチェック (Regex `^[0-9,\s]+$`).
    // 2. 少なくとも 1 つの整数があるかチェック。
    // 3. 空の要素がないかチェック (例: "1,,2" は NG).
    // しかし、正規表現だけで全てを網羅するのは複雑。
    // 問題文の「判定には正規表現を用いてください」という制約がありつつ、「数字とカンマ以外を含む行は妥当ではありません」なので、まず `^[0-9,\s]+$` でフィルタリング。
    // その後、実際に解析して空要素がないか確認するか、より高度な正規表現を使う。
    // 例: "1,,2" は NG. "1, 2" は OK. "1,2," は OK (末尾カンマ許容).
    // 正規表現 `^\s*(?:\d+\s*,\s*[\d\s]*?)*\s*$` は不正確。
    // より良い正規表現: `^\s*(?:\d+(\s*,\s*\d+)*)?\s*$` は "1" と "1," の両方を許容せず、最後の数字が必須とする傾向がある (実際には `\d+` が最後にある必要があるか？)。
    // 要件: "末尾のカンマは許容します" -> "1,2," OK.
    // これは、最後の要素が数値である必要がないことを意味する。
    // しかし、「1 個以上の数字列」があるので、少なくとも 1 つの整数は必要。
    // 構造: [空白] * [整数] * ([空白]* + カンマ + [空白]*) *
    // ここで「整数」は `\d+`。
    // したがって、正規表現: `^\s*(?:\d+\s*,\s*)*\s*$` は "1,," を許容する (最後の \s* が空でも OK). "1,,2" も許容する (中間のカンマに先頭の空白がないが、`\d+` が続く必要があるため NG).
    // 実際、`^\s*(?:\d+\s*,\s*)*\s*$` で "1,,2" をチェック: `1,` は OK, `,` は `\d+` がないので失敗。よって "1,,2" は NG.
    // "1,2," -> `1,` (OK), `2` (OK), `,` (最後なので OK). OK.
    // "1 , 2" -> `1`, space, `,`, space, `2`. `\d+` がスペースをスキャンし、カンマに到達する。`\s*` が空文字列と見なされるか？
    // 正規表現の動作: `\s*` は空白を含む任意文字列。
    // "1 , 2" -> `1` (match), `,` (start of group?), `\s*` matches nothing? No.
    // グループ `(?:\d+\s*,\s*)` は「数字」＋「カンマ」＋「空白」のセット。
    // "1 , 2" -> `1` (match), `,` (start of next group). `\s*` matches nothing? No.
    // グループ `(?:\d+\s*,\s*)` は必ず数字で終わらなければならないか？`\s*` はカンマの後に空白をスキャンする。
    // 構造: `A` = `\d+`. `B` = `\s*`, `,`. `C` = `\s*`.
    // グループは `A` + `B` + `C`? いや、`(?:\d+\s*,\s*)` は `\d+` + `\s*` + `,` + `\s*`.
    // "1 , 2" -> `1` (match A), space (match B's \s*), `,` (match comma), space (match C). Next is `2`. Next group starts.
    // So "1 , 2" matches. "1,2" matches. "1,,2" -> `1` (A), empty (B), comma (comma). Wait, `\d+` must be present.
    // "1,,2": `1` (A). Next is `,`. B expects `\s*` then `,`. So B matches nothing? Then comma matches comma. But `\d+` is missing before second comma.
    // Actually, the pattern `(?:\d+\s*,\s*)*` means zero or more occurrences of "digits followed by optional whitespace, comma, optional whitespace".
    // "1,,2": `1` matches A. Then we expect `,`. Next char is `,`. B's `\s*` matches empty. Comma matches comma. Then C's `\s*` matches empty. Next char is `,`. We expect another group. But next is `,`. No digits. Fails.
    // So `^\s*(?:\d+\s*,\s*)*\s*$` works for "1,,2" (NG), "1,2," (OK), "1 , 2" (OK).
    // Does it cover "1,2,"? Yes. `1` + `,` + `\s*`. Then `2`. Then `,`. Wait.
    // Let's re-evaluate "1,2," with `(?:\d+\s*,\s*)*`.
    // Match 1: `1`. Then `,` (matches comma part). Then `\s*` matches empty. End of string? No, next is `2`.
    // So the group must consume `1` and `,`. But then `2` remains unmatched.
    // Ah, the pattern `(?:\d+\s*,\s*)*` consumes `1` and `,`. The next char is `2`. This does not start a group.
    // So "1,2," would fail because after consuming `1,`, we are at `2`. `2` is not part of the pattern (unless it's the next group's `\d+`).
    // But the group requires `,` after `\s*`.
    // Wait, `2` starts a new group. `\d+` matches `2`. Then `\s*` matches empty. Then `,` matches comma.
    // So "1,2," is matched by two groups: `(1,)` and `(2,)`.
    // Yes! `^\s*(?:\d+\s*,\s*)*\s*$` works perfectly for "1,2,".
    // What about "1"? Group `1`. Matches. `\s*` at end matches empty. OK.
    // What about " 1 , 2 "? Spaces handled by leading/trailing `\s*`.
    // What about "a"? Fails `^[0-9,\s]+$`.
    // So the plan:
    // 1. Line must match `^[0-9,\s]+$` (only digits, comma, whitespace).
    // 2. Line must match `^\s*(?:\d+\s*,\s*)*\s*$` (structure of integers separated by commas, allowing trailing comma, requiring at least one integer).
    // Note: The second regex implicitly requires at least one integer because `\d+` is inside the group which is repeated zero or more times. If it repeats zero times, the string must be empty or just whitespace (handled by `^\s*`). But we need "1 個以上の数字列".
    // So we also need to ensure at least one integer exists.
    // We can use a lookahead or adjust the pattern. Or simply check if the first match of `\d+` exists.
    // Alternatively, combine: `^\s*(?:\d+\s*,\s*)*\s*$` allows empty string (if no groups).
    // So we need to ensure not just whitespace.
    // Pattern: `^\s*(?=\d)(?:\d+\s*,\s*)*\s*$`. The lookahead `(?=\d)` ensures at least one digit exists before the start of the main group logic? No, the main group starts with `\d+`.
    // Actually, `(?:\d+\s*,\s*)*` matches zero times.
    // If we use `(?:\d+\s*,\s*)+`, it requires at least one group.
    // Then the pattern becomes `^\s*(?:\d+\s*,\s*)+\s*$`.
    // Does this allow "1,2,"? Group 1: `1,`. Group 2: `2,`. Yes.
    // Does it allow "1"? Group 1: `1`. Yes.
    // Does it allow "1,,"? Group 1: `1,` (consumes comma). Next char is `,`. `\s*` matches empty. Comma matches comma. Wait. `(?:\d+\s*,\s*)` expects `\d+` after the comma of previous group? No.
    // The pattern `(?:\d+\s*,\s*)+` means: (digits + optional whitespace + comma + optional whitespace) repeated one or more times.
    // "1,," -> Group 1: `1`. Then `,`. Then `\s*` empty. Next char is `,`. We expect `\d+`. Fails. Correct (NG).
    // "1,2," -> Group 1: `1`, `,`. Group 2: `2`, `,`. Yes. OK.
    // So the regex `^\s*(?:\d+\s*,\s*)+\s*$` seems to satisfy all conditions including "at least one integer" and "trailing comma allowed".
    // Wait, does it allow leading spaces? `^\s*` handles it. Trailing spaces? `\s*$` handles it.
    // Does it allow spaces inside? "1 , 2". Group 1: `1`, space, comma. Next char is space. `\s*` matches space. Comma matches comma. Next char is space. `\s*` matches space. Next char is `2`. Fails because we expect `\d+` immediately after the comma's optional whitespace?
    // Ah, `(?:\d+\s*,\s*)` structure: `\d+` then `\s*` then `,` then `\s*`.
    // "1 , 2":
    // `1` matches `\d+`.
    // space matches `\s*`.
    // comma matches `,`.
    // space matches `\s*`.
    // Next char is `2`. We expect the next group to start with `\d+`.
    // Does the current group end? Yes. The pattern repeats.
    // So `1` is matched. Then `,` is matched by the comma part of the first group?
    // Wait, `(?:\d+\s*,\s*)` consumes `1`, space, comma, space.
    // The next character is `2`. The next iteration starts with `\d+`. Matches `2`.
    // Then `\s*` matches nothing. Then `,` expects a comma. But end of string (if input "1 , 2").
    // If input is "1 , 2", does it end with comma? No.
    // So "1 , 2" matches `(?:\d+\s*,\s*)+`?
    // Group 1: `1`, space, comma, space. (Consumes up to the second `2`).
    // Wait, the comma is inside the group. So after consuming `,`, we are at `2
