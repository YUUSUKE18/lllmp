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
            // 仕様の「1 個以上の数字列がカンマで区切られて並んでいる」を厳密に捉えるため、
            // 以下のロジックで「数字とカンマ以外を含まないか」と「少なくとも1つの数字があるか」をチェックします。

            // 1. 数字とカンマ以外を含まないか、およびカンマ区切りであることを確認
            // パターン: 任意の空白、数字、カンマのみで構成されているか
            // 妥当な行の定義: 1個以上の数字列がカンマで区切られて並んでいる。末尾のカンマは許容。
            
            // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」を判定する正規表現
            // ^\s*             : 行頭の空白
            // (?:[0-9]+,\s*)*  : 0回以上の (数字 + カンマ + 空白) の繰り返し
            // [0-9]+           : 少なくとも1つの数字が存在すること
            // .*              : 残りの文字（末尾のカンマなど）
            // $               : 行末
            
            // よりシンプルに、行が数字とカンマのみで構成され、かつ数字が少なくとも1つあることを確認する。
            // 末尾のカンマは許容されるため、行全体が数字とカンマのみで構成されていることを確認します。
            // ただし、空行は妥当ではないため、行が完全に空でないことを確認する必要があります。

            // 妥当な行の判定ロジックを正規表現で表現します。
            // 1. 行が完全に空でないこと (trim()で空でないことを確認)
            // 2. 行が数字とカンマのみで構成されていること (数字とカンマ以外を含まない)
            // 3. 少なくとも1つの数字が含まれていること
            
            String trimmedLine = line.trim();
            boolean isValid = false;

            if (!trimmedLine.isEmpty()) {
                // 数字とカンマのみで構成されているかチェック
                // ^[0-9,]*$ : 行が数字とカンマのみで構成されているか
                // このチェックだけでは「1個以上の数字列」の条件を満たさない可能性があるため、
                // 実際に分割して数字が存在するかを確認します。
                
                String[] parts = trimmedLine.split(",");
                
                // 1. 少なくとも1つの要素があること (空行でないこと)
                // 2. その要素の中に数字が含まれていること
                boolean containsNumber = false;
                for (String part : parts) {
                    String trimmedPart = part.trim();
                    if (!trimmedPart.isEmpty()) {
                        try {
                            int num = Integer.parseInt(trimmedPart);
                            containsNumber = true;
                        } catch (NumberFormatException e) {
                            // 数字以外が含まれていれば、この行は妥当ではない（仕様違反）
                            isValid = false;
                            break;
                        }
                    }
                }
                
                if (isValid && containsNumber) {
                    validLines++;
                }
            }
        }

        System.out.println("valid=" + validLines);
    }
}
