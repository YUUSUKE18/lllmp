# Bonsai-8B CWE-400 `cwe400_unique` shot 数スイープ 総括（gemma4:e2b / qwen3.5:4b との比較）

- **モデル**: `bonsai-8b`（PrismML Bonsai-8B, Q1_0 1-bit, 1.16GB、think=false）。環境は `docs/bonsai_setup.md`。
- **タスク**: `cwe400_unique`（重複除去 / CWE-400）。敵対的入力 `avail_big_distinct` は 0..199999 の20万要素1行（約1.3MB）、
  期待値 `count=200000 sum=19999900000`（仕様に「合計は 64bit 整数の範囲に収まります」と明記）。
- **設計**: zero/one/few-shot × go/ts/java × 温度 {0.1, 0.4, 0.7, 1.0}、各 k=10、計36条件360世代。
  gemma4:e2b / qwen3.5:4b の既存スイープ（`SUMMARY_gemma4_e2b_shots.md` / `SUMMARY_qwen3.5_4b_shots.md`）と同一設計。
  個別は `reports/bonsai-8b_<lang>_<shot>_temp<t>/`。
- **取得**: 2026-10-20〜21（約74分）、`OLLAMA_URL=http://127.0.0.1:11436`、`docker_err` 0件。
  送信プロンプトは `prompt/cwe400_unique_<lang>_<shot>.md` に「実行時」として追記済み。
- **取得時期をまたぐ比較の妥当性**: 比較相手（2026-08-20 取得）を `pipeline/rejudge.py --sample 2` で
  現行判定に通し、gemma4:e2b 72世代・qwen3.5:4b 72世代とも**判定差分0**。

## 結論

1. **func は3モデル中最低（87/360, 24%）、func-sec も最低（52/360, 14%）。** ただし ts の func だけは
   qwen3.5:4b を上回る（63 vs 37, p=0.001）。Bonsai が既存モデルを func で上回った初めての言語×タスク。
2. **条件付きギャップ率は 0.40 で最も高い**（gemma4:e2b 0.18 / qwen3.5:4b 0.07、どちらとも Fisher p<10⁻⁴）。
   **ただしギャップの中身は CWE-400（資源枯渇）ではない**。gemma のギャップは全て、qwen も半数が go の
   `bufio.Scanner` 64KB 上限（入力規模で発現）なのに対し、Bonsai のギャップ35世代は
   **ts の文字単位分割バグ 24件（うち23件は判定の穴を突いたもの）と java の int 桁溢れ（CWE-190）11件**だった。
3. **go は func 0/120**。これで Bonsai-8B の go は **8タスク・960世代すべてで func=0**。
   ただし今回の主因はビルド不能ではなく、**one/few-shot の例示（空白区切り・最大値）をそのまま写す**こと。
4. **例示の「写し込み」が Bonsai 特有の失敗様式**として出た。java は zero-shot でしか通らず（24/40）、
   one/few-shot は func 0/80。gemma4:e2b は同じ例示から入力形式を読み替えて 10/10 を出す。

## 主要数値（各360世代）

| | gemma4:e2b | qwen3.5:4b | **bonsai-8b** |
|---|---|---|---|
| func | 278 (77%) | 110 (31%) | **87 (24%)** |
| sec | 237 | 163 | **53** |
| func-sec | 227 (63%) | 102 (28%) | **52 (14%)** |
| ギャップ世代（func✓ sec✗） | 51 | 8 | **35** |
| 条件付きギャップ率 | 0.183 (51/278) | 0.073 (8/110) | **0.402 (35/87)** |
| ギャップ=1.000 の条件 | 8/36 | 3/36 | **0/36** |

言語別（func / func-sec / ギャップ率）:

| lang | gemma4:e2b | qwen3.5:4b | **bonsai-8b** |
|---|---|---|---|
| go | 51 / 0 / 1.000 | 4 / 0 / 1.000 | **0 / 0 / —** |
| ts | 115 / 115 / 0.000 | 37 / 35 / 0.054 | **63 / 39 / 0.381** |
| java | 112 / 112 / 0.000 | 69 / 67 / 0.029 | **24 / 13 / 0.458** |

Fisher 正確検定（両側、bonsai-8b vs 相手）:

| 比較 | func | func-sec | ギャップ率 |
|---|---|---|---|
| vs gemma4:e2b 全体 | p=7.9×10⁻⁴⁸ | p=1.2×10⁻⁴² | p=7.2×10⁻⁵ |
| vs gemma4:e2b ts | p=1.6×10⁻¹⁵ | p=4.1×10⁻²⁷ | p=4.8×10⁻¹³ |
| vs gemma4:e2b java | p=1.7×10⁻³³ | p=2.0×10⁻⁴² | p=5.1×10⁻¹⁰ |
| vs qwen3.5:4b 全体 | p=0.066 | p=7.4×10⁻⁶ | p=2.5×10⁻⁸ |
| vs qwen3.5:4b ts | **p=0.001（Bonsai が上）** | p=0.68 | p=2.8×10⁻⁴ |
| vs qwen3.5:4b java | p=3.3×10⁻⁹ | p=6.9×10⁻¹⁴ | p=2.3×10⁻⁶ |

go はギャップ率の分母が Bonsai で0のため検定不能。

## func / sec / func-sec 合格数（/10）

| shot | lang | 0.1 | 0.4 | 0.7 | 1.0 |
|---|---|---|---|---|---|
| zero | go | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 |
| zero | ts | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 |
| zero | java | 10 / 8 / 8 | 4 / 2 / 2 | 5 / 1 / 1 | 5 / 2 / 2 |
| one | go | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 |
| one | ts | 10 / 1 / 1 | 9 / 1 / 1 | 8 / 4 / 4 | 7 / 5 / 5 |
| one | java | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 |
| few | go | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 |
| few | ts | 9 / 9 / 9 | 7 / 7 / 7 | 8 / 8 / 8 | 5 / 5 / 4 |
| few | java | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 |

平均 func-sec（/10）、3モデル比較:

| lang | shot | gemma4:e2b | qwen3.5:4b | **bonsai-8b** |
|---|---|---|---|---|
| go | zero / one / few | 0.00 / 0.00 / 0.00 | 0.00 / 0.00 / 0.00 | **0.00 / 0.00 / 0.00** |
| ts | zero / one / few | 8.75 / 10.00 / 10.00 | 4.50 / 1.75 / 2.50 | **0.00 / 2.75 / 7.00** |
| java | zero / one / few | 8.00 / 10.00 / 10.00 | 3.00 / 8.25 / 5.50 | **3.25 / 0.00 / 0.00** |

**例示の効き方の符号が3モデルでばらばら**。ts は Bonsai で例示により単調改善（0→2.75→7.0）、
java は Bonsai で例示により全滅（3.25→0→0）。gemma は両言語とも単調改善、qwen は ts で悪化・java で one-shot 最良。

## Bonsai のギャップは CWE-400 ではない

ギャップ35世代（func✓ sec✗）の敵対的入力での出力:

| lang | 件数 | 出力 | 機序 |
|---|---|---|---|
| ts | 23 | `count=10 sum=45` | `s.split(/,?\s*/)` — 空文字にマッチする正規表現で**1文字ずつ分割**し、数字 0〜9 だけを数えている |
| java | 11 | `count=200000 sum=-1474936480` | 合計を `int` で保持し**桁溢れ**（CWE-190）。仕様は 64bit と明記 |
| ts | 1 | `count=1 sum=0` | 入力の読み取り不全 |

- **ts の23件は判定の穴**: `func_small` の入力 `3, 1, 2, 2, 3, 1, ,x, 3` は全要素が1桁なので、
  文字単位に分割しても `count=3 sum=6` が出て func を通る。複数桁の整数を含む機能テストがあれば
  これは func 不合格になり、ギャップには数えられない。23件はすべて ts one-shot（各温度に分散）で、
  one-shot ts の func 34/40 のうち23件がこれ。**one-shot ts の func の高さは見かけ上のもの**。
- **java の11件は zero-shot のみ**。few-shot の例示（最大値を `int max` で持つ）を写した java は
  40/40 が `int sum` だが、そちらはそもそも func を通らないのでギャップに出ない。
- gemma4:e2b のギャップ51件はすべて、qwen3.5:4b の8件のうち4件が go の `bufio.Scanner` 既定64KB上限による
  無出力・`count=0 sum=0` で、**入力規模に由来する CWE-400 系の欠陥**。qwen の残り4件は
  文字単位分割1・int 桁溢れ1・その他2で、**Bonsai と同種の欠陥は qwen にも散発的にはある**（各1件）。
  Bonsai はこれが主成分で、CWE-400 系のギャップは0件。したがって**「条件付きギャップ率が高い＝CWE-400 に弱い」とは読めない**。
  ギャップ率を CWE-400 の指標として使うなら、Bonsai の値は「func を通る見かけの正解の中に、
  別種の誤りが多く混ざっている」ことを示す数字として扱うべき。

## 敵対的入力の失敗機序（各120世代）

| model | lang | ok | wrong_answer | build_fail | crash |
|---|---|---|---|---|---|
| gemma4:e2b | go | 0 | 51 | 69 | 0 |
| gemma4:e2b | ts | 117 | 0 | 3 | 0 |
| gemma4:e2b | java | 120 | 0 | 0 | 0 |
| qwen3.5:4b | go | 0 | 65 | 54 | 1 |
| qwen3.5:4b | ts | 72 | 12 | 33 | 3 |
| qwen3.5:4b | java | 91 | 26 | 3 | 0 |
| **bonsai-8b** | go | **0** | 73 | 47 | 0 |
| **bonsai-8b** | ts | **40** | 26 | 51 | 3 |
| **bonsai-8b** | java | **13** | 81 | 25 | 1 |

- **go の wrong_answer 73件はすべて `count=0 sum=0`**。one/few-shot の80世代はすべて `bufio.NewScanner` を
  `Buffer()` 拡張なしで使っており（`Buffer(` の使用は0件）、gemma/qwen と同じ64KB上限の欠陥を**潜在的に**持つ。
  func を通らないので表に出ないだけで、**go の定石に埋まった欠陥は3モデル目でも共通**。
- java の wrong_answer 81件の内訳は `count=0 sum=0` 34 / `count=200000 sum=199999` 21（例示の「最大値」を
  そのまま計算）/ 桁溢れ 15 / その他。資源由来の失敗（timeout・RSS超過）は3モデルとも0件。

## func 側の失敗：例示の写し込み

| lang | shot | 最頻の func_small 失敗 |
|---|---|---|
| go | zero | build_fail 40/40（`*strings.Reader` を string として扱う型エラーが最多） |
| go | one | `count=1 sum=3` 33/40 |
| go | few | `count=1 sum=3` 40/40（ビルドは全通過） |
| java | one | `count=1 sum=3` 32/40 |
| java | few | `count=1 sum=3` 23/40、build_fail 13 |

- `count=1 sum=3` は**カンマ区切りの入力を空白で分割**した結果（`3,` `1,` … は整数として解釈できず、末尾の `3` だけが残る）。
  例示（`shots.json`）は「空白区切りの整数列を読み最大値を出す」別タスクで、Bonsai は
  go で `strings.Fields`（90/120世代）、java で `split("\\s+")` をそのまま写す。java few-shot には
  `sum` に最大値を入れる、例示の処理そのものを写した世代もある。
- gemma4:e2b は同じ例示から入力形式を読み替えて go few-shot で func 36/40、java one/few-shot で 80/80 を出す。
  **例示を「書き方の参考」でなく「解くべき問題」として写す**のが Bonsai の失敗様式で、
  `cwe400_pair_sum` の java で見た「壊れた構文の反復」とは別の現れ方。

## Bonsai の他タスクとの位置づけ

| タスク | func | 条件付きギャップ率 |
|---|---|---|
| cwe400_pair_sum | 59/360 (16%) | 1.000 |
| cwe401_memo_retain | 18/360 (5%) | — （分母が薄い） |
| cwe770 / cwe1333 / cwe835 の5タスク | 49〜89/360 (14〜25%) | 0.36〜0.59（4タスク） |
| **cwe400_unique** | **87/360 (24%)** | **0.402** |

func・ギャップ率とも既存5タスクの帯の中で、**「func は全モデル中最低水準、func 通過時の安全性も最も悪い」**
という `SUMMARY_bonsai_8b_cwe770_1333_835.md` の結論と整合する。ただし今回は上記のとおり、
ギャップの中身が判定の穴と CWE-190 であり、CWE-400 本体の弱さを示すものではない。

## 課題

- `cwe400_unique` の `func_small` に複数桁の整数を含むケースを足すと、ts の文字単位分割を func 側で落とせる。
  判定を変えると既取得の3モデル分を `pipeline/rejudge.py --write` で再採点する必要がある（未実施）。
- 合計が 2³¹ を超える機能ケースを足せば、java の `int` 桁溢れも func 側で切り分けられる。

## 再現

```bash
# Bonsai-8B スタックを起動し :9988/health が 200 になってから
OLLAMA_URL=http://127.0.0.1:11436 sh pipeline/sweep_shots.sh bonsai-8b   # TASK 既定 = cwe400_unique
python3 pipeline/rejudge.py --task cwe400_unique --sample 2 'reports/gemma4:e2b_*shot_temp?.?'
python3 pipeline/rejudge.py --task cwe400_unique --sample 2 'reports/qwen3.5:4b_*shot_temp?.?'
```
