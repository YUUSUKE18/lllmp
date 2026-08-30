import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        // カンマ区切りの整数列を判定する正規表現
        // ^\s* : 行の先頭の空白
        // (?:[0-9]+(?:,\s*[0-9]+)*) : 1つ以上の数字列とカンマの組み合わせ。
        // このパターンは、数字とカンマが交互に現れることを許容し、末尾のカンマも許容する。
        // より厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認するため、
        // 少なくとも一つの数字列が存在することを保証する。
        // 以下のパターンは、数字とカンマが混在する文字列全体を捉えるのではなく、
        // 1つ以上の数字列がカンマで区切られている構造をチェックする。
        // 妥当な行は、数字とカンマのみで構成され、少なくとも1つの数字列を含む。
        // 例: 1,2,3 または 1,2,3,
        String patternString = "^\\s*(?:[0-9]+(?:,\\s*[0-9]+)*)(?:,\\s*|$)";
        Pattern pattern = Pattern.compile(patternString);

        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを許容しつつ、数字とカンマのみで構成されているかを確認する
            // 妥当なパターン: 1個以上の数字列がカンマで区切られている。
            // 例: "1,2,3" または "1,2,"
            // 数字とカンマのみで構成されていることを確認する正規表現
            // ^\s* : 行頭の空白
            // (?:[0-9]+(?:,\\s*[0-9]+)*) : 1つ以上の数字列とカンマの組み合わせ
            // (?:,\s*|$) : カンマと空白、または行末
            // この判定は少し複雑になるため、より単純に「数字とカンマのみ」で構成されているかを確認し、
            // 少なくとも1つの数字が含まれていることを確認する。

            // 妥当性の判定ロジックを再考:
            // 1. 数字とカンマ以外の文字が含まれていないこと。
            // 2. 少なくとも1つの数字列が存在すること。
            
            boolean isCommaSeparated = false;
            
            // 数字とカンマのみで構成されているかチェック
            if (trimmedLine.matches("^[0-9,]*$")) {
                // 少なくとも1つの数字が含まれているかチェック
                if (trimmedLine.matches(".*[0-9].*")) {
                    // 1個以上の数字列がカンマで区切られている、または単一の数字列である
                    isCommaSeparated = true;
                }
            }

            if (isCommaSeparated) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
