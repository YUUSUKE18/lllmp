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
            // ^\s* : 行頭の任意の空白
            // (?:(?=\d+,\s*)*\d+(?:,\s*\d+)*) : 1つ以上の数字とカンマの組み合わせ (例: 1,2,3, または 1,2,3)
            // .*$ : 行の残り (ここでは行全体が数字とカンマのみで構成されているかを確認するため、より厳密なパターンで判定する)
            
            // 妥当な形式の定義:
            // 1. 行が空でないこと。
            // 2. 行が数字とカンマのみで構成されていること（末尾のカンマは許容）。
            // 3. 少なくとも1つの数字列が存在すること。
            
            // 候補となるパターン: 任意の数の数字とカンマの組み合わせ。
            // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
            // 例: "1,2,3" または "1,2," または ",1,2" など
            
            // 以下の正規表現は、数字とカンマのみで構成されており、少なくとも1つの数字が含まれている行を検出します。
            // 任意の数の数字とカンマの組み合わせ (数字とカンマのみ)
            // \d+(?:,\d+)* : 1つ以上の数字、それに続くカンマと数字の繰り返し。
            // 末尾のカンマを許容するため、全体を検証します。
            
            // より簡単なアプローチとして、行をカンマで分割し、空でない要素が1つ以上あればOKとする。
            
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // 空行は妥当ではない
            }

            // 末尾のカンマを考慮して分割する。末尾のカンマは許容される。
            // 例: "1,2," -> split(",") -> ["1", "2", ""]
            String[] parts = trimmedLine.split(",");
            
            // 妥当性の判定: 1個以上の数字列がカンマで区切られていること。
            // これは、分割された配列の中に、空でない文字列が少なくとも1つ存在すれば満たされる。
            boolean isValid = false;
            for (String part : parts) {
                if (!part.trim().isEmpty()) {
                    isValid = true;
                    break;
                }
            }

            if (isValid) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
