import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 妥当性の判定ロジック
            // 妥当なのは「1 個以上の数字列がカンマで区切られて並んでいること」
            // 空行や数字とカンマ以外の文字を含む行は妥当ではない。

            // 正規表現パターン: 1つ以上の数字とカンマの組み合わせ（末尾のカンマは許容）
            // この仕様を厳密に解釈すると、「カンマで区切られた整数列」が主要な構造である必要があります。
            // 妥当な行は「1 個以上の数字列がカンマで区切られて並んでいる」こと。
            // これは、数字とカンマのみで構成され、少なくとも1つの数字が含まれている必要があることを意味します。

            // パターン: 
            // ^                : 行の先頭
            // [0-9,]*          : 数字またはカンマが0回以上続く
            // (?:,?[0-9]+)*    : カンマと1つ以上の数字のグループが0回以上繰り返される
            // (?:,*)?          : 末尾のカンマが0回または1回出現する（末尾のカンマは許容）
            // $                : 行の末尾
            
            // より簡単な解釈: 
            // 行が数字とカンマのみで構成されており、少なくとも1つの数字が含まれていること。
            
            // 1. 数字とカンマのみで構成されているかチェック
            boolean containsOnlyDigitsAndCommas = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!((c >= '0' && c <= '9') || c == ',')) {
                    containsOnlyDigitsAndCommas = false;
                    break;
                }
            }

            if (!containsOnlyDigitsAndCommas) {
                continue; // 数字とカンマ以外を含む行は不適
            }

            // 2. 少なくとも1つの数字が含まれているかチェック
            boolean containsAtLeastOneDigit = false;
            for (int i = 0; i < trimmedLine.length(); i++) {
                if (Character.isDigit(trimmedLine.charAt(i))) {
                    containsAtLeastOneDigit = true;
                    break;
                }
            }

            if (containsAtLeastOneDigit) {
                // 1個以上の数字列がカンマで区切られている、またはその可能性がある行
                // 空行でない、数字とカンマのみで構成され、数字が含まれていれば妥当とみなす。
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
