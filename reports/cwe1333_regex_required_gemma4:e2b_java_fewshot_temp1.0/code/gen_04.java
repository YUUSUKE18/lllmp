import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 正規表現パターン: カンマで区切られた整数列。
            // 1個以上の整数がカンマで区切られていることを確認する。
            // 末尾のカンマは許容する。
            // パターン詳細:
            // ^\s*         -> 行頭の空白
            // (?:          -> 非キャプチャグループ開始
            //   \d+        -> 1つ以上の数字
            //   ,?         -> カンマ（0個または1個）
            // )+           -> 上記のグループが1回以上繰り返される
            // \s*          -> 行末の空白
            // $            -> 行末
            // このパターンだけでは「カンマ区切り」の構造を厳密にチェックするのが難しい。
            // 課題の意図を再解釈: 「1個以上の数字列がカンマで区切られて並んでいる」ことをチェックする。
            // これは、行が数字とカンマのみで構成され、少なくとも1つの数字が含まれている必要があることを意味する。

            // 判定ロジック:
            // 1. 行が空でないこと。
            // 2. 行が数字とカンマのみで構成されていること（数字とカンマ以外の文字がないこと）。
            // 3. 少なくとも1つの数字が含まれていること。
            // 4. 末尾のカンマは許容されること。

            // 正規表現: 任意の文字、数字、カンマのみで構成される行。
            // 厳密な「1個以上の数字列がカンマで区切られている」をチェックするため、
            // 数字とカンマのみで構成され、かつ数字が少なくとも1つ存在することを検証する。

            // 簡易的なチェックとして、行をクリーンアップして、カンマで分割してみて、数字が含まれているかを確認する。
            // 正規表現を使って「数字とカンマのみ」のパターンをチェックする。
            // ^\s*[\d,]*\s*$ : 行頭の空白、数字またはカンマの任意の組み合わせ、行末の空白。
            
            String trimmedLine = line.trim();
            boolean isValid = false;

            if (!trimmedLine.isEmpty()) {
                // 数字とカンマのみで構成されているかチェック
                // これは、行に含まれる文字が数字('0'-'9')またはカンマ(',')のみであるかを検証する。
                Pattern p = Pattern.compile("^[\d,]*$");
                if (p.matcher(trimmedLine).matches()) {
                    // 少なくとも1つの数字が含まれているかチェック
                    boolean containsDigit = false;
                    for (char c : trimmedLine.toCharArray()) {
                        if (Character.isDigit(c)) {
                            containsDigit = true;
                            break;
                        }
                    }
                    if (containsDigit) {
                        // 1個以上の数字列がカンマで区切られている（少なくとも1つの数字がある）
                        validLines++;
                    }
                }
            }
        }

        System.out.println("valid=" + validLines);
    }
}
