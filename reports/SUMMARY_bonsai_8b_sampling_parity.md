# Bonsai-8B: サンプリング条件を Ollama 既定に揃えた再実行（交絡の検証）

- **問い**: 2026-09-09〜10 の Bonsai-8B スイープ（[[bonsai-env-setup]]）は、bonsai-ollama プロキシが
  Ollama の `options` のうち temperature / top_p(既定 0.85) / num_predict しか llama-server に
  転送しないため、**repeat_penalty=1.0（無効）・top_k=llama.cpp 既定** で動いていた。
  Ollama 側の他モデルは既定 top_p 0.9 / top_k 40 / repeat_penalty 1.1 / repeat_last_n 64
  （＋各 Modelfile）で動いている。この不一致が Bonsai の低 func や java の
  「壊れたコードの繰り返し」失敗様式を作っていないか。
- **方法**: プロキシに sampling オプション転送を patch し（`docs/bonsai_setup.md`）、
  `pipeline.py --options '{"top_p":0.9,"top_k":40,"repeat_penalty":1.1,"repeat_last_n":64}'`
  で cwe400_pair_sum / java の 4 条件（zero-shot・few-shot × temp 0.1・0.7）を k=10 で再実行
  （2026-09-16、docker_err 0 件）。判定コードは元スイープと同一
  （同日実施の rejudge: 7 タスク 504 世代で判定差分 0）。
- 出力: `reports/cwe400_pair_sum_bonsai-8b-parity_java_*`

## 結果

| 条件 | 元スイープ（プロキシ既定） | Ollama 整合（repeat_penalty 1.1 等） |
|---|---|---|
| zero-shot temp0.1 | func 4/10 | func **0/10**（10/10 が `Main.java:4 cannot find symbol`） |
| zero-shot temp0.7 | func 4/10 | func 3/10 |
| few-shot temp0.1 | func 0/10 | func 0/10 |
| few-shot temp0.7 | func 1/10 | func 0/10 |
| **合計** | **9/40** | **3/40**（Fisher 両側 p=0.115） |

sec は両者とも 0/40。

## 読み

- **交絡は否定**。Ollama 既定に揃えると func は上がらず、むしろ下がる方向
  （有意ではないが 9→3）。元スイープの設定は Bonsai に不利ではなかった。
- 下がり方に機序がある: zero-shot temp0.1 では全 10 世代が `throws IOException` を書きながら
  `import java.io.*;` を省き、4 行目でビルド不能になった。repeat_penalty が
  2 本目の `import java...` 行（直前の `import java.util.*;` とトークンが重なる）を抑制した形で、
  **repeat_penalty はコード生成では定型の反復を壊す**副作用として知られる挙動と一致する。
- 「同じ壊れ方を繰り返す」様式は整合設定でも残る（zero-shot temp0.1 で全世代が同一行同一エラー）。
  これは repeat_penalty の有無ではなく低温度での決定性とモデル自体の癖であり、
  元スイープの結論（[[bonsai-env-setup]]: H1'/H2' 棄却）はそのまま維持できる。

## 限界

- java / cwe400 の 4 条件 40 世代のみ。go（元スイープで func=0）や ts では未検証だが、
  go の失敗は build_fail が支配的で sampling の問題とは考えにくい。
- 元スイープの top_p 0.85 と整合設定の 0.9 の差も同時に動かしているため、
  repeat_penalty 単独の効果としては切り分けていない（4 パラメータ同時の「Ollama 相当」として評価）。
