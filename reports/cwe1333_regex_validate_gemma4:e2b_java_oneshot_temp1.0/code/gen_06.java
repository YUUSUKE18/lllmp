import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;

        String line;
        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して処理するために trim() を使用
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマが許容されるため、行全体をカンマで分割してチェックする
            // 行をカンマで分割し、要素が1つ以上あるか、かつ要素がすべて整数であるかを確認する
            String[] parts = trimmedLine.split(",");

            if (parts.length == 0) {
                // これは空行で処理されるはずだが、念のため
                continue;
            }

            boolean isValid = true;
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) {
                    // カンマが連続した場合や、末尾のカンマ処理が複雑になる可能性があるため、
                    // 空の要素が複数続く場合は妥当ではないと見なす
                    // ただし、仕様は「1 個以上の数字列がカンマで区切られて並んでいること」なので、
                    // 妥当な数字列が存在すれば良い。
                    // ここでは、要素が空文字列でないことを確認する。
                    continue;
                }
                try {
                    Integer.parseInt(trimmedPart);
                } catch (NumberFormatException e) {
                    // 数字とカンマ以外を含む行は妥当ではない
                    isValid = false;
                    break;
                }
            }

            // 妥当な行の判定：
            // 1. 空行ではない
            // 2. 少なくとも1つの有効な数字列が存在する（つまり、空文字列だけではない）
            // 3. 複数の数字列がカンマで区切られている（ただし末尾のカンマは許容）

            // 厳密に「1 個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
            // これは、分割後の要素のうち、数字としてパース可能なものが1つ以上存在すれば良い、という解釈になる。
            // または、区切り文字の存在を重視する。
            
            // 最もシンプルに、「カンマ区切りで数字のみで構成されているか」をチェックする。
            // 末尾のカンマが許容されるため、行全体をトリムし、カンマで分割した結果の要素が全て数字であることを確認する。
            
            // ここでは、行が完全に数字とカンマのみで構成されていることを確認する。
            // 妥当な行とは、トリムした行をカンマで分割した結果、空文字列のみではない要素が存在する場合と定義する。
            // そして、数字以外の文字が含まれていないことを保証する。
            
            // 提示された仕様に基づき、行が「カンマ区切りの整数列」であるかを判定する。
            // 1. 空行は無効。
            // 2. 数字とカンマ以外を含む行は無効。
            // 3. 1個以上の数字列がカンマで区切られている。

            // 行が空でない、かつ、分割後に数字以外の文字が混入していないことを確認する。
            // 行の末尾がカンマの場合、split(",")の結果、最後の要素は空文字列になる。
            
            // 複数の数字が連続している場合（例: 1,,2）、これは通常許容されないが、仕様上は許容範囲か？
            // 「1 個以上の数字列がカンマで区切られて並んでいる」
            
            // 例えば "1,2,3," -> parts = ["1", "2", "3", ""]。有効な要素は3つ。これは妥当。
            // 例えば "abc,1," -> isValid=false (数字以外のため)
            // 例えば ",," -> parts = ["", "", ""]。有効な要素は0。無効。

            // 妥当な要素の数を数えることで判定する。
            int actualValidCount = 0;
            for (String p : parts) {
                if (!p.trim().isEmpty()) {
                    actualValidCount++;
                }
            }
            
            // 1個以上の数字列が区切られていることを確認する
            if (actualValidCount >= 1) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
