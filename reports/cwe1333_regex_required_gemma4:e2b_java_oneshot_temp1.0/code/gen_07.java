import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }

            // 行の前後の空白を無視して処理
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 正規表現による妥当性の判定
            // 正規表現の解説:
            // ^                 : 行の先頭
            // [0-9,]+           : 1個以上の数字（整数）
            // (?:,[0-9,]*)*     : カンマと、それに続く0個以上の数字（末尾のカンマを含む）が0回以上繰り返される
            // $                 : 行の末尾
            //
            // より厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認するため、
            // 以下のロジックで検証する。
            // 妥当なパターン: 数字とカンマの組み合わせのみで構成され、数字が1つ以上存在すること。
            
            // 1. 数字とカンマのみで構成されているか？
            // 2. 数字が1つ以上含まれているか？
            // 3. 末尾にカンマがあっても良いか？
            
            // 構造: (数字) をカンマで区切って並べる。
            // 例: 1,2,3 または 1,2,3, または 1,2,3,
            
            // パターン: 1個以上の数字とカンマの組み合わせ。
            // ^\s*          -> 行頭の空白
            // (?:[0-9]+(?:,[0-9]+)*) -> 1個以上の数字がカンマで区切られているパターン
            // \s*$         -> 行末の空白
            
            // よりシンプルな判定として、正規表現で数字とカンマ以外の文字が含まれていないかを確認し、
            // その後、数字が存在するかを確認する方が要件を満たしやすい。
            
            // 要件: 1個以上の数字列がカンマで区切られて並んでいる。末尾のカンマは許容。空行、数字とカンマ以外は無効。

            // まず、数字とカンマのみで構成されているか、かつ数字が含まれているかを確認する。
            
            Pattern validPattern = Pattern.compile("^\\s*([0-9,]+(\\s*,[0-9,]+)*?)[\\s]*$");
            Matcher matcher = validPattern.matcher(line);
            
            // 厳密な検証のため、正規表現を調整する。
            // 数字とカンマのみで構成されており、少なくとも一つの数字が存在する。
            
            // 行から空白を除去した上で検証し、末尾のカンマの有無を考慮する。
            
            String strippedLine = line.replace(" ", "");
            
            if (strippedLine.isEmpty()) {
                // 空行は除外済みだが、念のため
                continue;
            }

            // 数字とカンマのみで構成されているか確認
            boolean containsOnlyDigitsAndCommas = true;
            for (char c : strippedLine.toCharArray()) {
                if (!((c >= '0' && c <= '9') || c == ',')) {
                    containsOnlyDigitsAndCommas = false;
                    break;
                }
            }

            if (!containsOnlyDigitsAndCommas) {
                continue;
            }
            
            // 少なくとも一つの数字が含まれているか確認
            boolean containsDigit = false;
            for (char c : strippedLine.toCharArray()) {
                if (c >= '0' && c <= '9') {
                    containsDigit = true;
                    break;
                }
            }

            if (!containsDigit) {
                // カンマのみの行 (例: ",," または ",") は無効
                continue;
            }

            // カンマ区切りで1つ以上の数字がある場合、妥当とみなす。
            validLines++;
        }

        System.out.println("valid=" + validLines);
    }
}
