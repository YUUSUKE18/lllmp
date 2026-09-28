# Bonsai-4B（1-bit, Q1_0）: cwe400_pair_sum / cwe401_memo_retain 各360世代

- **問い**（`SUMMARY_bonsai_8b.md` の「次にやること」）: 1-bit のままパラメータ数を絞った
  Bonsai-4B で func が戻るか。戻らなければ「1-bit 学習そのものがコード生成に向かない」
  という、8B 単体より強い結論になる。
- **設計**: qwen2.5-coder:1.5b / bonsai-8b と同一（2タスク × zero/one/few-shot × go/ts/java ×
  temp 0.1/0.4/0.7/1.0 × k=10 = 720世代）。プロキシ・pipeline の設定も bonsai-8b スイープと同一
  （プロキシ既定サンプリング、num_predict 2048。sampling 整合の検証は
  `SUMMARY_bonsai_8b_sampling_parity.md`）。2026-09-16 実施、docker_err 0 件。
- 重み: `prism-ml/Bonsai-4B-gguf` Q1_0（572MB）。起動は `bonsai/bonsai-ollama/run_bonsai4b.sh`。
- 出力: `reports/cwe400_pair_sum_bonsai-4b_*` / `reports/cwe401_memo_retain_bonsai-4b_*`

## 結果

| モデル | cwe400 func | cwe400 func-sec | cwe401 func | cwe401 func-sec | 壁時計(2タスク) |
|---|---|---|---|---|---|
| gemma4:e2b | 90% | — | 50% | — | 5.6h |
| qwen3.5:4b | 35% | — | 27% | — | — |
| qwen2.5-coder:1.5b | 79/360 (22%) | — | 54/360 (15%) | — | 1.4h |
| bonsai-8b | 59/360 (16.4%) | 0/360 | 18/360 (5.0%) | 8/360 | 8.2h |
| **bonsai-4b** | **0/360 (0%)** | 0/360 | **2/360 (0.6%)** | 1/360 | 4.1h |

- **func はほぼゼロ**。cwe400 は 36 条件 360 世代すべて不合格。cwe401 で通った 2 世代は
  ts one-shot temp0.4 と ts few-shot temp0.1 の各 1 世代。go は 8B と同じく全条件 func=0。
- **sec は測れない**（分母がない）。cwe401 の func-sec 1/360 は結論に使えない。
- 生成速度は 8B の数倍（約 50 tok/s。8B は 2 タスク 8.2h に対し 4B は 4.1h、
  ただし 4B の後半は反復ループで 2048 トークン上限まで走る世代が多く時間を食っている）。

## 失敗の中身

- ケース単位の失敗理由は build_fail が支配的（cwe400 426 件、cwe401 536 件）。
  ts の `Property 'readline' does not exist`・go の `sc.Scan returns 1 value`・
  java の `illegal start of expression` など、**存在しない API や型の取り違え**が並ぶ。
- **暴走生成が 8B より多い**: 720 世代中 96 世代（13%）が閉じフェンス無しで 2048 トークン上限に
  達し（8B は 2520 世代中 40、1.6%）、中身は日本語コメントの断片や同一行の反復
  （非空行の重複率中央値 0.38）。これらは判定上 `expected 'package', found ``` 等の
  build_fail に落ちるが、実態は生成の崩壊で、上限を広げても通らない。
- cwe400 のループ分類（`detect_loops.py`）は ts/java とも `other`（構造を検出できないほど壊れている）
  が最多で、8B で見えた「二重ループへの偏り」以前の段階。

## 読み

- **「1-bit のままサイズを絞って func を戻す」は不成立**。8B→4B で func は 16%→0%、5%→0.6% と
  さらに落ち、qwen3.5:4b（同じ 4B 級の通常量子化）の 35%/27% とは比較にならない。
- 8B の結果と合わせると、この評価系では **1-bit 系列（Bonsai）はサイズによらずコード生成の
  func 床を割っており**、「圧縮で稼ぐ」路線は 4B/8B の両端で棄却、27B は 8GB 機で動かない
  （`docs/bonsai_setup.md`）。残る路線は特化＋学習介入（LoRA）のみという
  `SUMMARY_bonsai_8b.md` の結論が強まる。

## 限界・注意

- 判定は他モデルと同一コード（bonsai-8b 分は同日 rejudge で 504 世代差分 0 を確認）。
  bonsai-4b は取得と判定が同日なので照合不要。
- 閉じフェンス無しの出力は `extract_code()` が全文を採用するため、フェンス行込みでビルドに回る。
  8B の 40 世代中 27 世代は反復でない（重複率 >0.5）短い出力で、フェンスの閉じ忘れという
  整形ミスだけで落ちた可能性がある。全て通ったとしても 7 タスク合計で +27（1%）で結論は動かないが、
  厳密には `extract_code()` に「先頭フェンスのみ」の救済を入れて再採点する余地がある。
- go zero-shot temp0.1 の 1 条件はスタック起動直後の 503 で初回が落ち、後から冪等スイープで
  補完した（同一設定、`result.md` の日付は同日）。
