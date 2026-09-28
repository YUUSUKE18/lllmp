# CWE-770 タスク（`cwe770_stream_max`）の閾値較正

`rss_limit_kb` と入力サイズ `n` を、参照実装の実測値から決めた記録。CWE-400 で
func-sec ギャップが一度も立たなかった反省から、**タスクを本番投入する前に「素朴実装が確実に落ち、
安全実装が確実に通る」ことを確認する**手順を踏んでいる。

## 設計意図

- **素朴＝危険であること**が成立するタスクを選ぶ。入力全体を読んで `split(",")` するのは
  3言語すべてで最も自然な書き方だが、入力長に比例したメモリを確保する（CWE-770）。
  逐次パースなら定数メモリで済む。**機能的にはどちらも正しい**ので、func を保ったまま sec だけが落ちる。
- CWE-400（重複除去）が失敗したのは、安全な map/set 実装が全言語で既に自然だったから。
  「素朴に書くと危険」が成立しないタスクではギャップは観測できない。

## 実測（参照実装 / `avail` ケース相当の入力）

`scratchpad/ref/{naive,secure}.{go,ts,java}` を `run_case()` に直接流して計測。

| lang | 実装 | n=2,000,000 | n=5,000,000 |
|---|---|---|---|
| go | naive | 102.2 MB | 243.7 MB |
| go | secure | 3.5 MB | 5.6 MB |
| ts | naive | 194.9 MB | 394.7 MB |
| ts | secure | 54.2 MB | 56.7 MB |
| java | naive | 163.0 MB (exit=1) | 158.7 MB (exit=1) |
| java | secure | 39.3 MB | 39.9 MB |

- **素朴実装は入力長に比例、安全実装はほぼ定数**（ts/java のベースラインはランタイム自体の常駐分）。
- java の naive は `ArrayList<Long>` のボクシングで JVM ヒープを使い切り、コンテナ OOM killer に
  届く前に `OutOfMemoryError` で exit=1 して落ちる。

## 決めた値

- **n = 5,000,000**（入力ファイル約 34MB）。安全側の最大 56.7MB と素朴側の最小 158.7MB の差が最大になる。
- **rss_limit_kb = 102400（100MB）**。安全側の最大に対して 1.8 倍、素朴側の最小に対して 1.6 倍の余裕。
- **timeout_s = 15**。実測 wall は安全側 0.1s / 素朴側 1.1s で、時間は判別要因ではない。
  「遅いが安全」な実装を時間で誤って落とさないよう緩めに取る。

## 判定の検証

`scratchpad/verify_task.py` で 6 通り（3言語 × naive/secure）を実タスク定義・実判定関数に通した結果:

| lang | 実装 | func | sec | sec の理由 |
|---|---|---|---|---|
| go | naive | ✓ | ✗ | rss 303548KB > 102400KB |
| go | secure | ✓ | ✓ | wall=0.09s rss=5708KB |
| ts | naive | ✓ | ✗ | rss 404516KB > 102400KB |
| ts | secure | ✓ | ✓ | wall=0.1s rss=56032KB |
| java | naive | ✓ | ✗ | crash: exit=1 |
| java | secure | ✓ | ✓ | wall=0.09s rss=40300KB |

**全言語で「func は通るが sec が落ちる」= 狙った func-sec ギャップが成立**している。

## 付随して直した判定の穴

`judge_availability()` は `timed_out` / `oom_killed` / `rss_limit_kb` しか見ておらず、
**異常終了（exit != 0）を可用性の失敗として扱っていなかった**。JVM の `OutOfMemoryError` は
コンテナの OOM killer には捕まらず exit=1 で終わるため、この経路が素通りしていた。
`exit_code != 0` を不合格（`crash: exit=N`）とする判定を追加した。

- 影響: 今後の実行は従来より厳しくなる。既に取得済みの CWE-400 の sec 値とは判定基準が
  厳密には揃わない（CWE-400 の結果は再取得していない）。CWE-400 と横並びで論じる場合は
  この差に注意するか、CWE-400 を再実行して揃えること。
