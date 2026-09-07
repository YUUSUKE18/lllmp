# 検証で送ったプロンプトの記録

実際にモデルへ送った文字列を、検証（条件）ごとに蓄積したもの。論文の付録にそのまま転記できるように、要約せず全文を残している。

- **1 ファイル = 1 プロンプト**。プロンプトは**タスク × 言語 × 例示数 × 例示セット × プロンプトセット**で決まり、モデル・温度・k には依存しないので、同じ文字列を使った検証は同じファイルの表に並ぶ。
- 生成元は `pipeline/prompts.json`（文言）と `pipeline/tasks.json`（仕様）、`pipeline/shots*.json`（例示）。ここはその出力の記録であって、編集しても検証には影響しない。
- 追加は自動（`pipeline.py` が `result.md` を書くときに記録する）。過去分の復元は `python3 pipeline/prompt_log.py --backfill`。
- `reports/_archive_*` は当時の仕様文が現行と異なるため対象外。

## 索引

| プロンプト | タスク | 言語 | 例示 | 検証条件数 |
|---|---|---|---|---|
| [`cwe1333_regex_required_go_fewshot3.md`](cwe1333_regex_required_go_fewshot3.md) | `cwe1333_regex_required` | go | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe1333_regex_required_go_oneshot.md`](cwe1333_regex_required_go_oneshot.md) | `cwe1333_regex_required` | go | one-shot（セット `shots.json`） | 8 |
| [`cwe1333_regex_required_go_zeroshot.md`](cwe1333_regex_required_go_zeroshot.md) | `cwe1333_regex_required` | go | zero-shot | 8 |
| [`cwe1333_regex_required_java_fewshot3.md`](cwe1333_regex_required_java_fewshot3.md) | `cwe1333_regex_required` | java | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe1333_regex_required_java_oneshot.md`](cwe1333_regex_required_java_oneshot.md) | `cwe1333_regex_required` | java | one-shot（セット `shots.json`） | 8 |
| [`cwe1333_regex_required_java_zeroshot.md`](cwe1333_regex_required_java_zeroshot.md) | `cwe1333_regex_required` | java | zero-shot | 8 |
| [`cwe1333_regex_required_ts_fewshot3.md`](cwe1333_regex_required_ts_fewshot3.md) | `cwe1333_regex_required` | ts | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe1333_regex_required_ts_oneshot.md`](cwe1333_regex_required_ts_oneshot.md) | `cwe1333_regex_required` | ts | one-shot（セット `shots.json`） | 8 |
| [`cwe1333_regex_required_ts_zeroshot.md`](cwe1333_regex_required_ts_zeroshot.md) | `cwe1333_regex_required` | ts | zero-shot | 8 |
| [`cwe1333_regex_validate_go_fewshot3.md`](cwe1333_regex_validate_go_fewshot3.md) | `cwe1333_regex_validate` | go | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe1333_regex_validate_go_oneshot.md`](cwe1333_regex_validate_go_oneshot.md) | `cwe1333_regex_validate` | go | one-shot（セット `shots.json`） | 8 |
| [`cwe1333_regex_validate_go_zeroshot.md`](cwe1333_regex_validate_go_zeroshot.md) | `cwe1333_regex_validate` | go | zero-shot | 8 |
| [`cwe1333_regex_validate_java_fewshot3.md`](cwe1333_regex_validate_java_fewshot3.md) | `cwe1333_regex_validate` | java | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe1333_regex_validate_java_oneshot.md`](cwe1333_regex_validate_java_oneshot.md) | `cwe1333_regex_validate` | java | one-shot（セット `shots.json`） | 8 |
| [`cwe1333_regex_validate_java_zeroshot.md`](cwe1333_regex_validate_java_zeroshot.md) | `cwe1333_regex_validate` | java | zero-shot | 8 |
| [`cwe1333_regex_validate_ts_fewshot3.md`](cwe1333_regex_validate_ts_fewshot3.md) | `cwe1333_regex_validate` | ts | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe1333_regex_validate_ts_oneshot.md`](cwe1333_regex_validate_ts_oneshot.md) | `cwe1333_regex_validate` | ts | one-shot（セット `shots.json`） | 8 |
| [`cwe1333_regex_validate_ts_zeroshot.md`](cwe1333_regex_validate_ts_zeroshot.md) | `cwe1333_regex_validate` | ts | zero-shot | 8 |
| [`cwe400_pair_sum_go_fewshot3.md`](cwe400_pair_sum_go_fewshot3.md) | `cwe400_pair_sum` | go | few-shot(3)（セット `shots.json`） | 12 |
| [`cwe400_pair_sum_go_oneshot.md`](cwe400_pair_sum_go_oneshot.md) | `cwe400_pair_sum` | go | one-shot（セット `shots.json`） | 12 |
| [`cwe400_pair_sum_go_zeroshot.md`](cwe400_pair_sum_go_zeroshot.md) | `cwe400_pair_sum` | go | zero-shot | 12 |
| [`cwe400_pair_sum_hint_go_fewshot3.md`](cwe400_pair_sum_hint_go_fewshot3.md) | `cwe400_pair_sum_hint` | go | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe400_pair_sum_hint_go_oneshot.md`](cwe400_pair_sum_hint_go_oneshot.md) | `cwe400_pair_sum_hint` | go | one-shot（セット `shots.json`） | 8 |
| [`cwe400_pair_sum_hint_go_zeroshot.md`](cwe400_pair_sum_hint_go_zeroshot.md) | `cwe400_pair_sum_hint` | go | zero-shot | 8 |
| [`cwe400_pair_sum_hint_java_fewshot3.md`](cwe400_pair_sum_hint_java_fewshot3.md) | `cwe400_pair_sum_hint` | java | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe400_pair_sum_hint_java_oneshot.md`](cwe400_pair_sum_hint_java_oneshot.md) | `cwe400_pair_sum_hint` | java | one-shot（セット `shots.json`） | 8 |
| [`cwe400_pair_sum_hint_java_zeroshot.md`](cwe400_pair_sum_hint_java_zeroshot.md) | `cwe400_pair_sum_hint` | java | zero-shot | 8 |
| [`cwe400_pair_sum_hint_ts_fewshot3.md`](cwe400_pair_sum_hint_ts_fewshot3.md) | `cwe400_pair_sum_hint` | ts | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe400_pair_sum_hint_ts_oneshot.md`](cwe400_pair_sum_hint_ts_oneshot.md) | `cwe400_pair_sum_hint` | ts | one-shot（セット `shots.json`） | 8 |
| [`cwe400_pair_sum_hint_ts_zeroshot.md`](cwe400_pair_sum_hint_ts_zeroshot.md) | `cwe400_pair_sum_hint` | ts | zero-shot | 8 |
| [`cwe400_pair_sum_java_fewshot3.md`](cwe400_pair_sum_java_fewshot3.md) | `cwe400_pair_sum` | java | few-shot(3)（セット `shots.json`） | 12 |
| [`cwe400_pair_sum_java_oneshot.md`](cwe400_pair_sum_java_oneshot.md) | `cwe400_pair_sum` | java | one-shot（セット `shots.json`） | 12 |
| [`cwe400_pair_sum_java_zeroshot.md`](cwe400_pair_sum_java_zeroshot.md) | `cwe400_pair_sum` | java | zero-shot | 12 |
| [`cwe400_pair_sum_ts_fewshot3.md`](cwe400_pair_sum_ts_fewshot3.md) | `cwe400_pair_sum` | ts | few-shot(3)（セット `shots.json`） | 12 |
| [`cwe400_pair_sum_ts_oneshot.md`](cwe400_pair_sum_ts_oneshot.md) | `cwe400_pair_sum` | ts | one-shot（セット `shots.json`） | 12 |
| [`cwe400_pair_sum_ts_zeroshot.md`](cwe400_pair_sum_ts_zeroshot.md) | `cwe400_pair_sum` | ts | zero-shot | 12 |
| [`cwe400_unique_go_fewshot3.md`](cwe400_unique_go_fewshot3.md) | `cwe400_unique` | go | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe400_unique_go_oneshot.md`](cwe400_unique_go_oneshot.md) | `cwe400_unique` | go | one-shot（セット `shots.json`） | 8 |
| [`cwe400_unique_go_zeroshot.md`](cwe400_unique_go_zeroshot.md) | `cwe400_unique` | go | zero-shot | 8 |
| [`cwe400_unique_java_fewshot3.md`](cwe400_unique_java_fewshot3.md) | `cwe400_unique` | java | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe400_unique_java_oneshot.md`](cwe400_unique_java_oneshot.md) | `cwe400_unique` | java | one-shot（セット `shots.json`） | 8 |
| [`cwe400_unique_java_zeroshot.md`](cwe400_unique_java_zeroshot.md) | `cwe400_unique` | java | zero-shot | 8 |
| [`cwe400_unique_ts_fewshot3.md`](cwe400_unique_ts_fewshot3.md) | `cwe400_unique` | ts | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe400_unique_ts_oneshot.md`](cwe400_unique_ts_oneshot.md) | `cwe400_unique` | ts | one-shot（セット `shots.json`） | 8 |
| [`cwe400_unique_ts_zeroshot.md`](cwe400_unique_ts_zeroshot.md) | `cwe400_unique` | ts | zero-shot | 8 |
| [`cwe401_memo_retain_go_fewshot3.md`](cwe401_memo_retain_go_fewshot3.md) | `cwe401_memo_retain` | go | few-shot(3)（セット `shots.json`） | 12 |
| [`cwe401_memo_retain_go_oneshot.md`](cwe401_memo_retain_go_oneshot.md) | `cwe401_memo_retain` | go | one-shot（セット `shots.json`） | 12 |
| [`cwe401_memo_retain_go_zeroshot.md`](cwe401_memo_retain_go_zeroshot.md) | `cwe401_memo_retain` | go | zero-shot | 12 |
| [`cwe401_memo_retain_hint_go_fewshot3.md`](cwe401_memo_retain_hint_go_fewshot3.md) | `cwe401_memo_retain_hint` | go | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe401_memo_retain_hint_go_oneshot.md`](cwe401_memo_retain_hint_go_oneshot.md) | `cwe401_memo_retain_hint` | go | one-shot（セット `shots.json`） | 8 |
| [`cwe401_memo_retain_hint_go_zeroshot.md`](cwe401_memo_retain_hint_go_zeroshot.md) | `cwe401_memo_retain_hint` | go | zero-shot | 8 |
| [`cwe401_memo_retain_hint_java_fewshot3.md`](cwe401_memo_retain_hint_java_fewshot3.md) | `cwe401_memo_retain_hint` | java | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe401_memo_retain_hint_java_oneshot.md`](cwe401_memo_retain_hint_java_oneshot.md) | `cwe401_memo_retain_hint` | java | one-shot（セット `shots.json`） | 8 |
| [`cwe401_memo_retain_hint_java_zeroshot.md`](cwe401_memo_retain_hint_java_zeroshot.md) | `cwe401_memo_retain_hint` | java | zero-shot | 8 |
| [`cwe401_memo_retain_hint_ts_fewshot3.md`](cwe401_memo_retain_hint_ts_fewshot3.md) | `cwe401_memo_retain_hint` | ts | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe401_memo_retain_hint_ts_oneshot.md`](cwe401_memo_retain_hint_ts_oneshot.md) | `cwe401_memo_retain_hint` | ts | one-shot（セット `shots.json`） | 8 |
| [`cwe401_memo_retain_hint_ts_zeroshot.md`](cwe401_memo_retain_hint_ts_zeroshot.md) | `cwe401_memo_retain_hint` | ts | zero-shot | 8 |
| [`cwe401_memo_retain_java_fewshot3.md`](cwe401_memo_retain_java_fewshot3.md) | `cwe401_memo_retain` | java | few-shot(3)（セット `shots.json`） | 12 |
| [`cwe401_memo_retain_java_oneshot.md`](cwe401_memo_retain_java_oneshot.md) | `cwe401_memo_retain` | java | one-shot（セット `shots.json`） | 12 |
| [`cwe401_memo_retain_java_zeroshot.md`](cwe401_memo_retain_java_zeroshot.md) | `cwe401_memo_retain` | java | zero-shot | 12 |
| [`cwe401_memo_retain_ts_fewshot3.md`](cwe401_memo_retain_ts_fewshot3.md) | `cwe401_memo_retain` | ts | few-shot(3)（セット `shots.json`） | 12 |
| [`cwe401_memo_retain_ts_oneshot.md`](cwe401_memo_retain_ts_oneshot.md) | `cwe401_memo_retain` | ts | one-shot（セット `shots.json`） | 12 |
| [`cwe401_memo_retain_ts_zeroshot.md`](cwe401_memo_retain_ts_zeroshot.md) | `cwe401_memo_retain` | ts | zero-shot | 12 |
| [`cwe770_rle_expand_go_fewshot3.md`](cwe770_rle_expand_go_fewshot3.md) | `cwe770_rle_expand` | go | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe770_rle_expand_go_oneshot.md`](cwe770_rle_expand_go_oneshot.md) | `cwe770_rle_expand` | go | one-shot（セット `shots.json`） | 8 |
| [`cwe770_rle_expand_go_zeroshot.md`](cwe770_rle_expand_go_zeroshot.md) | `cwe770_rle_expand` | go | zero-shot | 8 |
| [`cwe770_rle_expand_java_fewshot3.md`](cwe770_rle_expand_java_fewshot3.md) | `cwe770_rle_expand` | java | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe770_rle_expand_java_oneshot.md`](cwe770_rle_expand_java_oneshot.md) | `cwe770_rle_expand` | java | one-shot（セット `shots.json`） | 8 |
| [`cwe770_rle_expand_java_zeroshot.md`](cwe770_rle_expand_java_zeroshot.md) | `cwe770_rle_expand` | java | zero-shot | 8 |
| [`cwe770_rle_expand_ts_fewshot3.md`](cwe770_rle_expand_ts_fewshot3.md) | `cwe770_rle_expand` | ts | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe770_rle_expand_ts_oneshot.md`](cwe770_rle_expand_ts_oneshot.md) | `cwe770_rle_expand` | ts | one-shot（セット `shots.json`） | 8 |
| [`cwe770_rle_expand_ts_zeroshot.md`](cwe770_rle_expand_ts_zeroshot.md) | `cwe770_rle_expand` | ts | zero-shot | 8 |
| [`cwe770_stream_max_go_fewshot3.md`](cwe770_stream_max_go_fewshot3.md) | `cwe770_stream_max` | go | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe770_stream_max_go_fewshot3_shots_safe.md`](cwe770_stream_max_go_fewshot3_shots_safe.md) | `cwe770_stream_max` | go | few-shot(3)（セット `shots_safe`） | 4 |
| [`cwe770_stream_max_go_fewshot3_shots_unsafe.md`](cwe770_stream_max_go_fewshot3_shots_unsafe.md) | `cwe770_stream_max` | go | few-shot(3)（セット `shots_unsafe`） | 4 |
| [`cwe770_stream_max_go_oneshot.md`](cwe770_stream_max_go_oneshot.md) | `cwe770_stream_max` | go | one-shot（セット `shots.json`） | 8 |
| [`cwe770_stream_max_go_oneshot_shots_safe.md`](cwe770_stream_max_go_oneshot_shots_safe.md) | `cwe770_stream_max` | go | one-shot（セット `shots_safe`） | 4 |
| [`cwe770_stream_max_go_oneshot_shots_unsafe.md`](cwe770_stream_max_go_oneshot_shots_unsafe.md) | `cwe770_stream_max` | go | one-shot（セット `shots_unsafe`） | 4 |
| [`cwe770_stream_max_go_zeroshot.md`](cwe770_stream_max_go_zeroshot.md) | `cwe770_stream_max` | go | zero-shot | 8 |
| [`cwe770_stream_max_java_fewshot3.md`](cwe770_stream_max_java_fewshot3.md) | `cwe770_stream_max` | java | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe770_stream_max_java_fewshot3_shots_safe.md`](cwe770_stream_max_java_fewshot3_shots_safe.md) | `cwe770_stream_max` | java | few-shot(3)（セット `shots_safe`） | 4 |
| [`cwe770_stream_max_java_fewshot3_shots_unsafe.md`](cwe770_stream_max_java_fewshot3_shots_unsafe.md) | `cwe770_stream_max` | java | few-shot(3)（セット `shots_unsafe`） | 4 |
| [`cwe770_stream_max_java_oneshot.md`](cwe770_stream_max_java_oneshot.md) | `cwe770_stream_max` | java | one-shot（セット `shots.json`） | 8 |
| [`cwe770_stream_max_java_oneshot_shots_safe.md`](cwe770_stream_max_java_oneshot_shots_safe.md) | `cwe770_stream_max` | java | one-shot（セット `shots_safe`） | 4 |
| [`cwe770_stream_max_java_oneshot_shots_unsafe.md`](cwe770_stream_max_java_oneshot_shots_unsafe.md) | `cwe770_stream_max` | java | one-shot（セット `shots_unsafe`） | 4 |
| [`cwe770_stream_max_java_zeroshot.md`](cwe770_stream_max_java_zeroshot.md) | `cwe770_stream_max` | java | zero-shot | 8 |
| [`cwe770_stream_max_ts_fewshot3.md`](cwe770_stream_max_ts_fewshot3.md) | `cwe770_stream_max` | ts | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe770_stream_max_ts_fewshot3_shots_safe.md`](cwe770_stream_max_ts_fewshot3_shots_safe.md) | `cwe770_stream_max` | ts | few-shot(3)（セット `shots_safe`） | 4 |
| [`cwe770_stream_max_ts_fewshot3_shots_unsafe.md`](cwe770_stream_max_ts_fewshot3_shots_unsafe.md) | `cwe770_stream_max` | ts | few-shot(3)（セット `shots_unsafe`） | 4 |
| [`cwe770_stream_max_ts_oneshot.md`](cwe770_stream_max_ts_oneshot.md) | `cwe770_stream_max` | ts | one-shot（セット `shots.json`） | 8 |
| [`cwe770_stream_max_ts_oneshot_shots_safe.md`](cwe770_stream_max_ts_oneshot_shots_safe.md) | `cwe770_stream_max` | ts | one-shot（セット `shots_safe`） | 4 |
| [`cwe770_stream_max_ts_oneshot_shots_unsafe.md`](cwe770_stream_max_ts_oneshot_shots_unsafe.md) | `cwe770_stream_max` | ts | one-shot（セット `shots_unsafe`） | 4 |
| [`cwe770_stream_max_ts_zeroshot.md`](cwe770_stream_max_ts_zeroshot.md) | `cwe770_stream_max` | ts | zero-shot | 8 |
| [`cwe835_declared_count_go_fewshot3.md`](cwe835_declared_count_go_fewshot3.md) | `cwe835_declared_count` | go | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe835_declared_count_go_oneshot.md`](cwe835_declared_count_go_oneshot.md) | `cwe835_declared_count` | go | one-shot（セット `shots.json`） | 8 |
| [`cwe835_declared_count_go_zeroshot.md`](cwe835_declared_count_go_zeroshot.md) | `cwe835_declared_count` | go | zero-shot | 8 |
| [`cwe835_declared_count_java_fewshot3.md`](cwe835_declared_count_java_fewshot3.md) | `cwe835_declared_count` | java | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe835_declared_count_java_oneshot.md`](cwe835_declared_count_java_oneshot.md) | `cwe835_declared_count` | java | one-shot（セット `shots.json`） | 8 |
| [`cwe835_declared_count_java_zeroshot.md`](cwe835_declared_count_java_zeroshot.md) | `cwe835_declared_count` | java | zero-shot | 8 |
| [`cwe835_declared_count_ts_fewshot3.md`](cwe835_declared_count_ts_fewshot3.md) | `cwe835_declared_count` | ts | few-shot(3)（セット `shots.json`） | 8 |
| [`cwe835_declared_count_ts_oneshot.md`](cwe835_declared_count_ts_oneshot.md) | `cwe835_declared_count` | ts | one-shot（セット `shots.json`） | 8 |
| [`cwe835_declared_count_ts_zeroshot.md`](cwe835_declared_count_ts_zeroshot.md) | `cwe835_declared_count` | ts | zero-shot | 8 |

- プロンプト 102 種 / 検証 840 条件。
