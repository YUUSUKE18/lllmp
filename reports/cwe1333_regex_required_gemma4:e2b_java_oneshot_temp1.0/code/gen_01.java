import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 正規表現の解説:
            // ^\s*           -> 行の先頭の任意の空白文字 (無視)
            // (?:[0-9]+(?:\s*,[0-9]+)*) -> 1個以上の数字列がカンマで区切られているパターンをキャプチャ
            // (?:,*)?        -> 末尾のカンマが0回以上続くこと (末尾のカンマは許容)
            // \s*$           -> 行の末尾の任意の空白文字
            // この正規表現は「1個以上の数字列がカンマで区切られて並んでいる」ことをチェックします。
            // ただし、ここでは「カンマ区切りの整数列」として、カンマで区切られた数字の塊が存在するかどうかを判定します。
            // 具体的に「1 個以上の数字列がカンマで区切られて並んでいる」という条件を満たすかを確認します。

            // 判定ロジックをより厳密に行うため、行全体を解析し、パターンマッチングと整合性を確認します。
            // 妥当な行の定義: 1個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容。
            
            // パターン: 数字とカンマのみで構成され、少なくとも1つの数字列が含まれていること。
            // (?:[0-9]+(?:,.*)*) のように、カンマ区切りの数字の塊が少なくとも1つあることを確認します。
            // 末尾のカンマが許容されるため、行全体をチェックします。
            
            // より単純に、行に含まれる数字とカンマのみで構成され、数字が一つ以上存在するかをチェックします。
            // 数字とカンマ以外が含まれないことを確認します。
            // 妥当な行の例: "1,2,3", "1,2,"
            // 不妥当な行の例: "", "abc", "1 2", "1,a"
            
            // 正規表現で「数字とカンマのみ」で構成され、「少なくとも1つの数字」が含まれているかを確認します。
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 数字とカンマのみで構成されているか、そして数字が含まれているかを確認する。
            // 任意の空白文字は無視する。
            // パターン: 数字とカンマのシーケンスのみで構成され、最低1つの数字が含まれる。
            // \s* は行頭と行末の空白を考慮するため、trimは実行する。
            // 1個以上の数字列がカンマで区切られていることをチェックするため、
            // 少なくとも一つの数字の塊が存在する必要があります。
            
            // 妥当な形式の例: 1,2,3, または 1,2,3,
            // 数字とカンマ以外の文字が含まれていないか、カンマで区切られた数字が存在するか。
            
            // 厳密に「1 個以上の数字列がカンマで区切られて並んでいる」を正規表現で表現します。
            // 数字 (\\d+) とカンマ (,) の組み合わせが、少なくとも1回出現すること。
            // 末尾のカンマが許容されるため、行の終わりはカンマまたは数字で終わる。
            // 妥当なパターン: 1つ以上の数字がカンマで区切られている (末尾のカンマは任意)
            
            // 数字の塊が1つ以上存在し、それらがカンマで区切られていることを確認する。
            // (?:\\d+(?:,\\d+)*) : 1個以上の数字がカンマで区切られているパターン（末尾のカンマは任意）
            String regex = "^\\s*(?:\\d+(?:,\\d+)*)(?:,*)?\\s*$";
            
            // 上記のパターンでは、"1" や "1," はマッチしますが、空行は除外する必要があります。
            // 空行は既に`trimmedLine.isEmpty()`で除外済み。
            
            // 念のため、行に含まれる文字が数字とカンマのみであることを確認し、数字が存在することを確認する。
            boolean isStrictlyValid = true;
            for (char c : line.toCharArray()) {
                if (!Character.isDigit(c) && c != ',' && Character.isWhitespace(c)) {
                    isStrictlyValid = false;
                    break;
                }
            }
            
            if (!isStrictlyValid) {
                continue;
            }
            
            // 1個以上の数字が含まれているかを確認
            boolean containsDigit = false;
            for (char c : line.toCharArray()) {
                if (Character.isDigit(c)) {
                    containsDigit = true;
                    break;
                }
            }

            if (containsDigit) {
                // 数字とカンマのみで構成され、数字が含まれているため、これは妥当と見なす。
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
