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
            // 正規表現パターン: 
            // ^\s*       -> 行の先頭の空白を無視
            // (?:[0-9]+,\s*)* -> 1つ以上の数字とカンマの組み合わせ（カンマ区切りの整数列）が0回以上繰り返される
            // [0-9]+     -> 少なくとも1つの数字が存在すること
            // .*         -> 残りの文字（末尾のカンマなども含む）
            // $          -> 行の終わり
            // このパターンは「1個以上の数字列がカンマで区切られて並んでいる」ことを確認するのに適していますが、
            // 仕様の「1個以上の数字列がカンマで区切られて並んでいる」を厳密に捉えるため、
            // 以下のロジックで「数字とカンマ以外を含まないか」と「少なくとも1つの数字があるか」をチェックします。

            // 1. 数字とカンマ以外を含まないか、およびカンマ区切りであることを確認
            // 許容されるのは、数字とカンマのみで構成され、少なくとも1つの数字が含まれている場合。
            // 末尾のカンマは許容される。
            // パターン: ^\s*([0-9]+(?:,\s*[0-9]+)*)(?:,*)?$
            // よりシンプルに、行全体が数字とカンマのみで構成され、数字が少なくとも1つあることを確認する。

            // 妥当性の判定ロジック:
            // 1. 行が空でないこと (trim()でチェック)
            // 2. 行に含まれる文字が数字とカンマのみであること
            // 3. 少なくとも1つの数字が含まれていること

            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 正規表現で数字とカンマのみで構成されているかチェック
            // ^[0-9,]*$ : 行が数字とカンマのみで構成されているか
            // このチェックだけでは「1個以上の数字列がカンマで区切られている」ことを保証できないため、
            // 実際に分割してチェックする方が仕様に忠実です。

            // 1. カンマで分割し、各要素が数字のみか、または空でないかを確認する
            String[] parts = trimmedLine.split(",");
            boolean isValid = true;
            int digitCount = 0;

            for (String part : parts) {
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) {
                    // 空の要素は許容される（末尾のカンマなど）
                    continue;
                }
                
                // 各要素が整数であるかチェック
                try {
                    Integer.parseInt(trimmedPart);
                    digitCount++;
                } catch (NumberFormatException e) {
                    // 数字以外の文字が含まれていた場合、妥当ではない
                    isValid = false;
                    break;
                }
            }

            if (isValid && digitCount > 0) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
