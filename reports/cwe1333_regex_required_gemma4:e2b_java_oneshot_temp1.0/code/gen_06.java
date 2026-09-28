import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }

            // 正規表現パターン: 
            // ^\s*             -> 行頭の任意の空白
            // (?:[\d,]+)       -> 1つ以上の数字またはカンマのグループ (これが数字列を含む)
            // (?:\s*,?)*       -> 0回以上の空白とカンマ (区切り)
            // $                -> 行末
            // よりシンプルに、1個以上の数字とカンマのみで構成されているかを確認する
            // 妥当な形式: 1個以上の数字とカンマで構成されており、空行や不正な文字を含まない。
            // 末尾のカンマは許容される。
            // パターン: 任意の空白、数字とカンマの組み合わせ、任意の空白で構成される。
            // 求められているのは「1個以上の数字列がカンマで区切られて並んでいる」こと。
            // 正規表現で「1つ以上の数字とカンマのシーケンス」が連続していることを確認する。
            // 妥当な行は、数字とカンマのみで構成され、少なくとも1つの数字が含まれている。
            // 末尾のカンマは許容されるため、行全体が数字とカンマで構成され、少なくとも1つの数字が含まれている必要がある。
            
            // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」を判定するには、
            // 1. 行が空でないこと。
            // 2. 行が数字とカンマのみで構成されていること。
            // 3. 数字が存在すること。
            
            // 正規表現の解釈に基づき、「数字とカンマのみ」の文字列であることを確認する。
            // (?=.*?\d) : 少なくとも1つの数字が存在すること
            // [^0-9,]* : 数字とカンマ以外の文字が存在しないこと
            // .* : 任意の文字（空白も含む）
            
            // 空白を無視し、数字とカンマのみで構成されているかを確認する
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 行が数字とカンマのみで構成されているかを確認する。
            // 末尾のカンマは許容される。
            // 妥当な行は、数字とカンマのみで構成されている行。
            // 例: "1,2,3" は OK。 "1,2," は OK。 "1,2,3 " は OK (空白は無視される)
            
            // 妥当なパターン: 数字 (0-9) または カンマ (,) の連続。末尾のカンマは許容される。
            // パターン: 1つ以上の数字とカンマのみが含まれ、かつ他の文字がないこと。
            // 厳密に「数字列がカンマで区切られている」ことを確認するため、カンマで区切られた数字のリストが存在する。
            
            // 1. 数字とカンマ以外の文字が含まれていないか
            if (!trimmedLine.matches("^[0-9,]*$")) {
                continue;
            }
            
            // 2. 少なくとも1つの数字が含まれているか (カンマだけ、または何も数字がない場合はNG)
            boolean containsDigit = false;
            for (char c : trimmedLine.toCharArray()) {
                if (Character.isDigit(c)) {
                    containsDigit = true;
                    break;
                }
            }

            if (containsDigit) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
