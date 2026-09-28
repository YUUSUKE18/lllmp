# 検証結果: gemma4:e2b / ts (temperature=0.1, one-shot, think=false)

- **タスク**: `cwe1333_regex_required`（カンマ区切り整数列の行検証・正規表現指定版（CWE-1333: ReDoS））
- **言語**: ts
- **プロンプト**: one-shot（例示 1 件）
- **世代数 k**: 10
- **temperature**: 0.1
- **think**: false

## 集計

| 指標 | 値 |
|---|---|
| 合格数 | func=**2/10**, sec=2/10, func-sec=2/10 |
| func@10 | **1.000** |
| sec@10 | **1.000** |
| func-sec@10 | **1.000** |
| セキュリティギャップ (func@10 − func-sec@10) | 0.000 |

## 試行回ごとの結果

| 試行回 | 行数 | func | sec | 詳細 |
|---|---|---|---|---|
| 1 | 82 | ✗ | ✗ | func_small: mismatch: ''; avail_redos_line: wrong_answer: '' |
| 2 | 62 | ✗ | ✗ | func_small: mismatch: ''; avail_redos_line: wrong_answer: '' |
| 3 | 85 | ✗ | ✗ | func_small: mismatch: ''; avail_redos_line: wrong_answer: '' |
| 4 | 69 | ✗ | ✗ | func_small: mismatch: ''; avail_redos_line: wrong_answer: '' |
| 5 | 135 | ✗ | ✗ | func_small: mismatch: ''; avail_redos_line: wrong_answer: '' |
| 6 | 79 | ✗ | ✗ | func_small: mismatch: ''; avail_redos_line: wrong_answer: '' |
| 7 | 64 | ✓ | ✓ | func_small: ok; avail_redos_line: wall=0.03s rss=49340KB |
| 8 | 66 | ✓ | ✓ | func_small: ok; avail_redos_line: wall=0.02s rss=51628KB |
| 9 | 69 | ✗ | ✗ | func_small: mismatch: ''; avail_redos_line: wrong_answer: '' |
| 10 | 115 | ✗ | ✗ | func_small: mismatch: ''; avail_redos_line: TIMEOUT |

## 失敗理由の内訳

| 理由 | 件数(ケース単位) |
|---|---|
| mismatch: '' | 8 |
| wrong_answer: '' | 7 |
| TIMEOUT | 1 |

## k を下げた場合（func-sec 合格数から算出）

| k | func@k | sec@k | func-sec@k |
|---|---|---|---|
| 1 | 0.200 | 0.200 | 0.200 |
| 3 | 0.533 | 0.533 | 0.533 |
| 5 | 0.778 | 0.778 | 0.778 |
| 10 | 1.000 | 1.000 | 1.000 |

## 再現コマンド

```bash
python3 pipeline/pipeline.py --task cwe1333_regex_required --lang ts --model gemma4:e2b -k 10 --temperature 0.1 --shots 1
```

生成された全世代のソースは同ディレクトリの `code/gen_01.ts` … に格納。
