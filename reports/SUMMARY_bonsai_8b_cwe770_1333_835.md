# Bonsai-8B（1-bit）× CWE-770/1333/835 横断総括（5タスク×36条件×k=10=1800世代）

- **対象**: `bonsai-8b`（PrismML Bonsai-8B, Q1_0 1-bit量子化, 1.16GB）を、
  既存の gemma4:e2b・qwen3.5:4b と同一設計（各タスク zero/one/few-shot × go/ts/java ×
  温度{0.1,0.4,0.7,1.0} の36条件×k=10）で5タスクスイープ。
  `cwe770_stream_max` / `cwe770_rle_expand` / `cwe1333_regex_validate` /
  `cwe1333_regex_required` / `cwe835_declared_count`。
- 取得日 2026-09-10（10:50〜18:06、壁時計 約7.3h）、`docker_err` 0件。環境は `docs/bonsai_setup.md`。
- 個別総括: `SUMMARY_cwe770_stream_max_bonsai_8b.md` / `SUMMARY_cwe770_rle_expand_bonsai_8b.md` /
  `SUMMARY_cwe1333_regex_validate_bonsai_8b.md` / `SUMMARY_cwe1333_regex_required_bonsai_8b.md` /
  `SUMMARY_cwe835_declared_count_bonsai_8b.md`
- CWE-400/401（ミニコーダー仮説との対決）は `reports/SUMMARY_bonsai_8b.md` を参照。本書はその続編で、
  対象タスクが違うため直接合算はしない。

## 結論

**func が低いことは cwe400/401 と同じだが、ここでは分母が十分に大きく（49〜89世代）、
「func を通った世代の中での安全率」を統計的に意味のある形で比較できる。結果:
Bonsai-8B は func 通過世代に限っても、gemma4:e2b・qwen3.5:4b よりはっきり危険側に寄る。**
cwe400/401（[[gap-count-denominator-trap]]で分母が薄すぎて比較不能だった）とは違い、
**ここでの劣位は統計的артефクトではない。**

## 主要数値（各360世代）

| タスク | 指標 | gemma4:e2b | qwen3.5:4b | **bonsai-8b** |
|---|---|---|---|---|
| cwe770_stream_max | func | 318 (88%) | 104 (29%) | **89 (25%)** |
| | sec | 0 | 0 | **0** |
| cwe770_rle_expand | func | 204 (57%) | 156 (43%) | **72 (20%)** |
| | sec | 210 | 176 | **52** |
| | func-sec | 204 | 153 | **46** |
| cwe1333_regex_validate | func | 219 (61%) | 116 (32%) | **61 (17%)** |
| | sec | 240 | 194 | **53** |
| | func-sec | 213 | 106 | **29** |
| cwe1333_regex_required | func | 176 (49%) | 144 (40%) | **49 (14%)** |
| | sec | 207 | 226 | **39** |
| | func-sec | 175 | 123 | **27** |
| cwe835_declared_count | func | 196 (54%) | 127 (35%) | **56 (16%)** |
| | sec | 183 | 126 | **23** |
| | func-sec | 182 | 126 | **23** |

## 条件付きギャップ率（ギャップ ÷ func通過。分母が薄い cwe770_stream_max は全モデル天井のため除く）

| タスク | gemma4:e2b | qwen3.5:4b | **bonsai-8b** | Fisher p（対gemma4） | Fisher p（対qwen3.5） |
|---|---|---|---|---|---|
| cwe770_rle_expand | 0.000 (0/204) | 0.019 (3/156) | **0.361 (26/72)** | 1.3×10⁻¹⁷ | 4.2×10⁻¹² |
| cwe1333_regex_validate | 0.027 (6/219) | 0.086 (10/116) | **0.525 (32/61)** | 2.4×10⁻¹⁹ | 2.1×10⁻¹⁰ |
| cwe1333_regex_required | 0.006 (1/176) | 0.146 (21/144) | **0.449 (22/49)** | 5.8×10⁻¹⁶ | 3.8×10⁻⁵ |
| cwe835_declared_count | 0.071 (14/196) | 0.008 (1/127) | **0.589 (33/56)** | 1.0×10⁻¹⁵ | 3.8×10⁻²⁰ |

**8比較すべて Holm 補正後も有意**（両側 Fisher 正確検定、m=8、最大の補正後p値でも 3.8×10⁻⁵）。
分母（func通過数）は49〜204と cwe401（func=18）のような極小ケースではなく、
**この劣位は「たまたま母数が薄いから」ではない。**

## なぜそうなるか

各タスクで欠陥の**種類**を見ると、Bonsai-8B は「罠にかからない」のではなく
**別種の欠陥に先に躓いている**ケースが多い:

1. **cwe770_rle_expand**: gemma4/qwen3.5 と同じく配列に展開する世代は出ない（罠は回避）。
   しかし java の26世代が **int32 の `sum`/`count` 桁溢れ**で落ちる——「展開しない」ことと
   「正しく計算する」ことは別問題で、Bonsai-8B は前者だけ満たして後者を落とす。
2. **cwe1333_regex_{validate,required}**: go・ts は正規表現をほぼ書けない/書かない
   （go 96.7%が未使用）ため、func 自体が測れずギャップにも入らない。
   **java だけが正規表現を書く力を持つが、危険な入れ子量化子を書く率が他モデルより高い**
   （regex_required の java 危険率15.0% は3モデル中最高）。
3. **cwe835_declared_count**: 「宣言値を信じる」欠陥が gemma4:e2b では ts に出ていたのに対し、
   Bonsai-8B は **java に集中する**（34世代中32件）。しかも **one/few-shot の例示がこの欠陥を
   誘発する**——zero-shot java 低温度は逆に安全側の定型（9/10でfunc・sec両立）に落ちる。
   例示が安全性を下げる、という他タスクにない逆転が観測された。

## go の完全崩壊（7タスク横断）

cwe400/401（[[bonsai-env-setup]]）を含めた**7タスク・840世代**すべてで、
**go は1世代も func を通していない**（0/840）。build_fail の主因は一貫して
未使用 import・import 忘れ・基本構文エラーで、アルゴリズムの巧拙以前の水準。
**Bonsai-8B は go を書く能力そのものを欠いている**、が最も単純で頑健な結論である。

## コスト面

| タスク | 壁時計（36条件360世代） |
|---|---|
| cwe770_stream_max | 約1.1h |
| cwe770_rle_expand | 約1.3h |
| cwe1333_regex_validate | 約1.3h |
| cwe1333_regex_required | 約1.5h |
| cwe835_declared_count | 約1.7h |
| **合計(5タスク1800世代)** | **約7.3h** |

cwe400/401（2タスク720世代で8.2h）より1世代あたりは速い——TIMEOUTケース（10秒待ち）の
比率がこの5タスクでは相対的に少ないため。絶対的な生成速度自体は変わらない
（[[bonsai-env-setup]] 参照）。

## 比較可能性

gemma4:e2b・qwen3.5:4b のデータ取得時期（2026-08-20〜09-01）と bonsai-8b（09-10）は異なるが、
判定コード・タスク定義は不変（[[rejudge-cross-time-comparison]] は未実施、必要なら
`pipeline/rejudge.py` で保存済みコードを再採点できる）。

## 関連

[[bonsai-env-setup]] [[gap-count-denominator-trap]] `reports/SUMMARY_bonsai_8b.md`（CWE-400/401編）
