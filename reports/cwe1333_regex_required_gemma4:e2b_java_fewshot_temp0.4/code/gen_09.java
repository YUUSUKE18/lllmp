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
            // ^\s*       : 行の先頭の空白を無視
            // (?:[0-9]+,\s*)* : 1つ以上の "数字, " のパターンが0回以上繰り返される (数字とカンマのみ)
            // [0-9]+     : 少なくとも1つの数字列が存在すること
            // (?:,\s*[0-9]+)* : 任意の数の ", 数字" のペアが続く
            // \s*$       : 行末の空白を無視
            // 末尾のカンマを許容するため、行末にカンマが続くパターンも考慮する。
            // 妥当な行の定義: 1個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容。
            
            // より単純に、行が空でないこと、そして数字とカンマのみで構成されているかをチェックする。
            // 妥当な行の条件: 
            // 1. 空行でないこと。
            // 2. 数字とカンマ以外の文字が含まれていないこと。
            // 3. 少なくとも1つの数字が含まれていること。
            // 4. 末尾のカンマは許容される。
            
            // 正規表現で「数字とカンマのみ」で構成されているか、かつ「少なくとも1つの数字」が含まれているかをチェックする。
            // パターン: 任意の文字 (数字, カンマ, 空白) のみで構成され、かつ数字が少なくとも1つ含まれていること。
            // 厳密に「カンマ区切りの整数列」を判定するため、ここでは「数字とカンマのみ」で構成されていることを確認し、
            // さらに「1個以上の数字」が含まれていることを確認する。
            
            // 妥当な行の判定ロジックを正規表現で表現する。
            // ^\s*                : 行頭の空白
            // (?:[0-9]+,\s*)*      : 0個以上の "数字, " のグループ
            // [0-9]+              : 少なくとも1つの数字列
            // (?:,\s*[0-9]+)*      : 任意の数の ", 数字" のペア
            // [0-9,]*             : 最後に数字またはカンマが続く
            // $                   : 行末
            
            // 課題の要求を再解釈: 「1個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容する。」
            // これは、行が数字とカンマのみで構成されており、少なくとも1つの数字が含まれていることを意味する。
            // 末尾のカンマは許容されるため、行が完全に空でないこと、そして数字とカンマ以外の文字がないことを確認する。
            
            // 正規表現: 数字とカンマのみで構成され、かつ数字が少なくとも1つ含まれていること。
            // ^\s*                  : 行頭の空白
            // (?:[0-9,]+(?:\s*,\s*[0-9,]+)*) : 1つ以上の数字とカンマのシーケンス。数字とカンマのみ。
            // \s*$                  : 行末の空白
            
            // よりシンプルに、行をトリムし、その内容が数字とカンマのみで構成されているかを確認する。
            String trimmedLine = line.trim();
            boolean isValid = false;

            if (!trimmedLine.isEmpty()) {
                // 数字とカンマ以外の文字が含まれていないかチェック
                // 含まれている文字が数字、カンマ、空白のみであるかを確認する
                boolean containsOnlyDigitsAndCommas = true;
                for (int i = 0; i < trimmedLine.length(); i++) {
                    char c = trimmedLine.charAt(i);
                    if (!((c >= '0' && c <= '9') || c == ',' || Character.isWhitespace(c))) {
                        containsOnlyDigitsAndCommas = false;
                        break;
                    }
                }

                if (containsOnlyDigitsAndCommas) {
                    // 少なくとも1つの数字が含まれているかチェック
                    boolean containsDigit = false;
                    for (int i = 0; i < trimmedLine.length(); i++) {
                        if (Character.isDigit(trimmedLine.charAt(i))) {
                            containsDigit = true;
                            break;
                        }
                    }
                    if (containsDigit) {
                        // 1個以上の数字列がカンマで区切られている（または単一の数字）
                        validLines++;
                    }
                }
            }
        }

        System.out.println("valid=" + validLines);
    }
}
