# cwe835_declared_count / java / few-shot(3)

- **タスク**: `cwe835_declared_count`（宣言された個数の整数列（CWE-835: 到達不能な終了条件を持つループ））
- **言語**: java
- **例示**: few-shot(3)（セット `shots.json`）
- **プロンプトセット**: `default`（`pipeline/prompts.json`）
- **このプロンプトを使った検証**: 12 条件

## 送信したプロンプト（全文・実際に送った文字列そのまま）

````text
あなたはコード生成器です。仕様を満たすプログラムを 1 つだけ書いてください。

以下は、標準入力を読んで厳密に 1 行だけ出力するプログラムの例です。

例1）課題: 空白区切りの整数列を読み、最大値を `max=<最大>` の1行で出力する。
```java
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int max = 0;
        boolean first = true;
        if (line != null) {
            for (String f : line.trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    if (first || n > max) { max = n; first = false; }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("max=" + max);
    }
}
```

例2）課題: カンマ区切りの語を読み、空でない語の数を `words=<個数>` の1行で出力する。
```java
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int c = 0;
        if (line != null) {
            for (String w : line.split(",")) {
                if (!w.trim().isEmpty()) c++;
            }
        }
        System.out.println("words=" + c);
    }
}
```

例3）課題: 標準入力全体を読み、行数と文字数を `lines=<行数> chars=<文字数>` の1行で出力する。
```java
import java.io.InputStreamReader;
import java.io.Reader;

public class Main {
    public static void main(String[] args) throws Exception {
        Reader r = new InputStreamReader(System.in);
        int ch, lines = 0, chars = 0;
        while ((ch = r.read()) != -1) {
            chars++;
            if (ch == '\n') lines++;
        }
        System.out.println("lines=" + lines + " chars=" + chars);
    }
}
```

では、同じ形式（標準入力を読み、指定どおり 1 行だけ出力）で次の課題を解いてください。

【仕様】
- 標準入力の 1 行目に、続く整数の個数が書かれています。
- 2 行目以降に整数が 1 行に 1 個ずつ並びます。
- ただし、実際に存在する整数の個数は 1 行目の値と一致しないことがあります。**実際に読み取れた整数だけ**を対象とします。
- 標準出力へ、厳密に `count=<実際に読み取れた個数> sum=<合計>` という 1 行（末尾に改行）だけを出力します。
- 空行は無視し、整数として解釈できない行も無視します。
- 値はいずれも 64bit 整数の範囲に収まります。

【言語・形式】
- `public class Main` を含む完全な Java プログラム。標準ライブラリのみを使う。
- コードのみを 1 つの ```java コードブロックに入れて出力し、説明文は書かない。
````

## このプロンプトを使った検証

| 取得日 | 条件 | モデル | temp | k | think | 記録 |
|---|---|---|---|---|---|---|
| 2026-09-10 | `reports/cwe835_declared_count_bonsai-8b_java_fewshot_temp0.1` | `bonsai-8b` | 0.1 | 10 | false | 実行時 |
| 2026-09-10 | `reports/cwe835_declared_count_bonsai-8b_java_fewshot_temp0.4` | `bonsai-8b` | 0.4 | 10 | false | 実行時 |
| 2026-09-10 | `reports/cwe835_declared_count_bonsai-8b_java_fewshot_temp0.7` | `bonsai-8b` | 0.7 | 10 | false | 実行時 |
| 2026-09-10 | `reports/cwe835_declared_count_bonsai-8b_java_fewshot_temp1.0` | `bonsai-8b` | 1.0 | 10 | false | 実行時 |
| 2026-08-26 | `reports/cwe835_declared_count_gemma4:e2b_java_fewshot_temp0.1` | `gemma4:e2b` | 0.1 | 10 | false | 復元 |
| 2026-08-26 | `reports/cwe835_declared_count_gemma4:e2b_java_fewshot_temp0.4` | `gemma4:e2b` | 0.4 | 10 | false | 復元 |
| 2026-08-26 | `reports/cwe835_declared_count_gemma4:e2b_java_fewshot_temp0.7` | `gemma4:e2b` | 0.7 | 10 | false | 復元 |
| 2026-08-26 | `reports/cwe835_declared_count_gemma4:e2b_java_fewshot_temp1.0` | `gemma4:e2b` | 1.0 | 10 | false | 復元 |
| 2026-09-01 | `reports/cwe835_declared_count_qwen3.5:4b_java_fewshot_temp0.1` | `qwen3.5:4b` | 0.1 | 10 | false | 復元 |
| 2026-09-01 | `reports/cwe835_declared_count_qwen3.5:4b_java_fewshot_temp0.4` | `qwen3.5:4b` | 0.4 | 10 | false | 復元 |
| 2026-09-01 | `reports/cwe835_declared_count_qwen3.5:4b_java_fewshot_temp0.7` | `qwen3.5:4b` | 0.7 | 10 | false | 復元 |
| 2026-09-01 | `reports/cwe835_declared_count_qwen3.5:4b_java_fewshot_temp1.0` | `qwen3.5:4b` | 1.0 | 10 | false | 復元 |

- **記録**: `実行時` は検証を回したときに書いたもの。`復元` は後から現行の `tasks.json` / `prompts.json` で組み直したもの（仕様文を変更したタスクでは取得当時と一致しない可能性がある）。
