import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        // カンマ区切りの整数列を判定する正規表現。
        // ^\s* 表示行の先頭の任意の空白
        // (?:[0-9]+(?:,\s*[0-9]+)*)  1つ以上の数字とカンマ（オプションで空白を含む）のグループ
        // (?:,\s*|$)                 カンマと空白、または行末
        // $                          行の終わり
        // このパターンは、カンマで区切られた整数列が1つ以上存在することをチェックするのに適しています。
        // より厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認します。
        // 少なくとも一つの数字が、カンマで区切られて存在することを確認します。
        // 正規表現の解釈を工夫し、行が空でないことと、数字とカンマのみで構成されていることを確認します。

        // 妥当な行の判定ロジック
        for (String line : br.lines().toList()) {
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 正規表現を使用して、行が「カンマ区切りの整数列」であるかを判定する。
            // これは、「数字とカンマのみ」で構成されており、少なくとも1つの数字が含まれていることを意味します。
            // パターン: ^[0-9,]*$ は、数字とカンマのみで構成されていることを確認する。
            // さらに、少なくとも1つの数字が含まれているかを確認するために、数字の存在をチェックする。

            // 1. 数字とカンマのみで構成されているか？
            // 数字 (0-9) とカンマ (,) のみを含む行
            String pattern = "^[0-9,]*$";
            if (!Pattern.compile(pattern).matcher(trimmedLine).matches()) {
                // 数字やカンマ以外の文字が含まれている場合は不妥当
                continue;
            }

            // 2. 少なくとも1つの数字が含まれているか？
            // 数字が含まれていない場合（例: "," や ",," など）は不妥当
            if (!trimmedLine.matches(".*[0-9].*")) {
                continue;
            }

            // 3. 末尾のカンマは許容される（これは上記のパターンで満たされている）
            // 末尾のカンマがあっても、数字が含まれていれば妥当とする。

            validLines++;
        }

        System.out.println("valid=" + validLines);
    }
}
