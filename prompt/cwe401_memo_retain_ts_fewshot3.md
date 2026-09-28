# cwe401_memo_retain / ts / few-shot(3)

- **タスク**: `cwe401_memo_retain`（Collatz 手数の合計・メモ化あり（CWE-401: 解放されない保持））
- **言語**: ts
- **例示**: few-shot(3)（セット `shots.json`）
- **プロンプトセット**: `default`（`pipeline/prompts.json`）
- **このプロンプトを使った検証**: 20 条件

## 送信したプロンプト（全文・実際に送った文字列そのまま）

````text
あなたはコード生成器です。仕様を満たすプログラムを 1 つだけ書いてください。

以下は、標準入力を読んで厳密に 1 行だけ出力するプログラムの例です。

例1）課題: 空白区切りの整数列を読み、最大値を `max=<最大>` の1行で出力する。
```ts
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let max = 0, first = true;
  for (const f of s.split(/\s+/)) {
    if (f.trim() === "") continue;
    const n = parseInt(f, 10);
    if (Number.isNaN(n)) continue;
    if (first || n > max) { max = n; first = false; }
  }
  console.log(`max=${max}`);
});
```

例2）課題: カンマ区切りの語を読み、空でない語の数を `words=<個数>` の1行で出力する。
```ts
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let c = 0;
  for (const w of s.split(",")) if (w.trim() !== "") c++;
  console.log(`words=${c}`);
});
```

例3）課題: 標準入力全体を読み、行数と文字数を `lines=<行数> chars=<文字数>` の1行で出力する。
```ts
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (const ch of s) if (ch === "\n") lines++;
  console.log(`lines=${lines} chars=${s.length}`);
});
```

では、同じ形式（標準入力を読み、指定どおり 1 行だけ出力）で次の課題を解いてください。

【仕様】
- 標準入力に、1 以上の整数が 1 行に 1 個ずつ並びます（クエリ）。
- 各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。n が 1 のときの手数は 0 です。
- すべてのクエリの手数の合計を求めます。
- 標準出力へ、厳密に `total=<合計>` という 1 行（末尾に改行）だけを出力します。
- 同じ整数が繰り返し現れるので、計算結果をメモ化して高速化してください。
- 空行は無視し、整数として解釈できない行も無視します。途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります。

【言語・形式】
- Node.js で動く完全な TypeScript。`process.stdin` から入力を読む。外部パッケージは使わない。
- コードのみを 1 つの ```ts コードブロックに入れて出力し、説明文は書かない。
````

## このプロンプトを使った検証

| 取得日 | 条件 | モデル | temp | k | think | 記録 |
|---|---|---|---|---|---|---|
| 2026-09-16 | `reports/cwe401_memo_retain_bonsai-4b_ts_fewshot_temp0.1` | `bonsai-4b` | 0.1 | 10 | false | 実行時 |
| 2026-09-16 | `reports/cwe401_memo_retain_bonsai-4b_ts_fewshot_temp0.4` | `bonsai-4b` | 0.4 | 10 | false | 実行時 |
| 2026-09-16 | `reports/cwe401_memo_retain_bonsai-4b_ts_fewshot_temp0.7` | `bonsai-4b` | 0.7 | 10 | false | 実行時 |
| 2026-09-16 | `reports/cwe401_memo_retain_bonsai-4b_ts_fewshot_temp1.0` | `bonsai-4b` | 1.0 | 10 | false | 実行時 |
| 2026-09-10 | `reports/cwe401_memo_retain_bonsai-8b_ts_fewshot_temp0.1` | `bonsai-8b` | 0.1 | 10 | false | 実行時 |
| 2026-09-10 | `reports/cwe401_memo_retain_bonsai-8b_ts_fewshot_temp0.4` | `bonsai-8b` | 0.4 | 10 | false | 実行時 |
| 2026-09-10 | `reports/cwe401_memo_retain_bonsai-8b_ts_fewshot_temp0.7` | `bonsai-8b` | 0.7 | 10 | false | 実行時 |
| 2026-09-10 | `reports/cwe401_memo_retain_bonsai-8b_ts_fewshot_temp1.0` | `bonsai-8b` | 1.0 | 10 | false | 実行時 |
| 2026-08-27 | `reports/cwe401_memo_retain_gemma4:e2b_ts_fewshot_temp0.1` | `gemma4:e2b` | 0.1 | 10 | false | 復元 |
| 2026-08-27 | `reports/cwe401_memo_retain_gemma4:e2b_ts_fewshot_temp0.4` | `gemma4:e2b` | 0.4 | 10 | false | 復元 |
| 2026-08-27 | `reports/cwe401_memo_retain_gemma4:e2b_ts_fewshot_temp0.7` | `gemma4:e2b` | 0.7 | 10 | false | 復元 |
| 2026-08-27 | `reports/cwe401_memo_retain_gemma4:e2b_ts_fewshot_temp1.0` | `gemma4:e2b` | 1.0 | 10 | false | 復元 |
| 2026-09-06 | `reports/cwe401_memo_retain_qwen2.5-coder:1.5b_ts_fewshot_temp0.1` | `qwen2.5-coder:1.5b` | 0.1 | 10 | false | 復元 |
| 2026-09-06 | `reports/cwe401_memo_retain_qwen2.5-coder:1.5b_ts_fewshot_temp0.4` | `qwen2.5-coder:1.5b` | 0.4 | 10 | false | 復元 |
| 2026-09-06 | `reports/cwe401_memo_retain_qwen2.5-coder:1.5b_ts_fewshot_temp0.7` | `qwen2.5-coder:1.5b` | 0.7 | 10 | false | 復元 |
| 2026-09-06 | `reports/cwe401_memo_retain_qwen2.5-coder:1.5b_ts_fewshot_temp1.0` | `qwen2.5-coder:1.5b` | 1.0 | 10 | false | 復元 |
| 2026-08-28 | `reports/cwe401_memo_retain_qwen3.5:4b_ts_fewshot_temp0.1` | `qwen3.5:4b` | 0.1 | 10 | false | 復元 |
| 2026-08-29 | `reports/cwe401_memo_retain_qwen3.5:4b_ts_fewshot_temp0.4` | `qwen3.5:4b` | 0.4 | 10 | false | 復元 |
| 2026-08-29 | `reports/cwe401_memo_retain_qwen3.5:4b_ts_fewshot_temp0.7` | `qwen3.5:4b` | 0.7 | 10 | false | 復元 |
| 2026-08-29 | `reports/cwe401_memo_retain_qwen3.5:4b_ts_fewshot_temp1.0` | `qwen3.5:4b` | 1.0 | 10 | false | 復元 |

- **記録**: `実行時` は検証を回したときに書いたもの。`復元` は後から現行の `tasks.json` / `prompts.json` で組み直したもの（仕様文を変更したタスクでは取得当時と一致しない可能性がある）。
