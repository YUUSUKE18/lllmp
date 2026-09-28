import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            int validLines = 0;

            String line;
            while ((line = br.readLine()) != null) {
                // 行の前後の空白を無視
                String trimmedLine = line.trim();

                if (trimmedLine.isEmpty()) {
                    // 空行は妥当ではない
                    continue;
                }

                // 正規表現による判定
                // パターン: 1個以上の数字とカンマの組み合わせ。末尾のカンマも許容する。
                // ^: 行の開始
                // [0-9,]*: 0個以上の数字またはカンマ（数字のみで構成されている必要はないが、これは後続のチェックで担保する）
                // 1個以上の数字が含まれていることを確認する方が適切。
                // 妥当な形式: (数字,数字,...)[,]*
                // 正規表現の設計方針:
                // 1. 少なくとも一つの数字が存在すること
                // 2. 数字とカンマ以外の文字が含まれていないこと
                // 3. カンマで区切られていること
                
                // より厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認するため、
                // 数字とカンマのみで構成され、かつ少なくとも一つの数字が含まれているパターンを試みる。
                // パターン: 数字とカンマの連続（少なくとも1つ以上の数字を含む）
                // (\d+[,]?\d*)*  -> 複数の数字とカンマの組み合わせを表現
                // \d+           -> 少なくとも1つの数字で始まる
                
                // シンプルに「数字とカンマのみで構成され、数字が含まれている」ことを確認する。
                // 少なくとも一つの数字を含む、カンマで区切られた数値列。
                String regex = "^[0-9,]+$"; 
                
                // 上記の正規表現だけでは「1個以上の数字列がカンマで区切られて並んでいる」を満たさないため、
                // 実際のロジックで「数字」の存在を別途確認する必要があります。
                
                // 要件再確認: 1個以上の数字列がカンマで区切られて並んでいる。
                // 例: "1,2,3" または "1,2,"
                
                // この形式は、数字とカンマのみで構成されていることを確認します。
                // その後、数字が1つ以上含まれているかを確認します。
                
                if (Pattern.matches(regex, trimmedLine)) {
                    // 数字とカンマのみで構成されている
                    boolean containsDigit = false;
                    for (char c : trimmedLine.toCharArray()) {
                        if (Character.isDigit(c)) {
                            containsDigit = true;
                            break;
                        }
                    }
                    if (containsDigit) {
                        validLines++;
                    }
                }
            }

            System.out.println("valid=" + validLines);

        } catch (IOException e) {
            // エラー処理（通常は不要だが念のため）
        }
    }
}
