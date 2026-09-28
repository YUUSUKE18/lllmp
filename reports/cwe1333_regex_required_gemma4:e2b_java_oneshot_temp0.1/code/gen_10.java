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
            // 正規表現パターン:
            // ^\s*          -> 行の先頭の任意の空白
            // (?:[0-9]+,\s*)* -> 1つ以上の数字とカンマのグループ（数字とカンマの後に空白があっても良い）
            // [0-9]+       -> 少なくとも1つの数字（これが必須）
            // (?:,\s*[0-9]+)* -> その後に続くカンマと数字のグループ（0回以上）
            // \s*$         -> 行末の任意の空白
            // このパターンは「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する必要があります。
            // よりシンプルに、「カンマで区切られた数字の列」をチェックします。

            // 妥当な行の判定ロジック:
            // 1. 行が空でないこと。
            // 2. 行が数字とカンマのみで構成されていること。
            // 3. 少なくとも1つの数字が含まれていること。
            // 4. 末尾のカンマは許容されること。

            // 正規表現の設計:
            // ^\s*             -> 行頭の空白
            // (?:[0-9]+,\s*)*  -> 0回以上の「数字,」のパターン（これは数字列が1つ以上あることを保証しない）
            // [0-9]+           -> 少なくとも1つの数字（これが必須）
            // (?:,\s*[0-9]+)*  -> その後に続く「,数字」のパターン（0回以上）
            // \s*$             -> 行末の空白

            // 妥当な行の定義: 1個以上の数字列がカンマで区切られている。
            // 例: "1,2,3" または "1,2," または "1"
            // 最小要件: 少なくとも1つの数字が含まれ、カンマで区切られている可能性がある。

            // 妥当な行の判定をより厳密に行うため、行をトリムし、カンマで分割してチェックします。
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを許容するため、行全体をチェックする正規表現を試みる。
            // 1. 数字とカンマのみで構成されているか？
            // 2. 少なくとも1つの数字が含まれているか？
            // 3. 含まれている数字がカンマで区切られているか？

            // 妥当な行のパターン: 
            // 1つ以上の数字とカンマの組み合わせで構成されていること。
            // 例: "1,2,3", "1,2,", "1"
            // 否定的な条件: 数字とカンマ以外の文字が含まれていないこと。

            // 数字とカンマのみで構成されているかを確認するパターン
            // ^\s*                -> 行頭の空白
            // [0-9,]*             -> 数字またはカンマのみ
            // \s*$                -> 行末の空白
            // このパターンだけでは「1個以上の数字列」の条件を満たさない可能性がある（例: "," や "1,,2"）

            // 1. 行をカンマで分割し、すべてが数字であることを確認する。
            String[] parts = trimmedLine.split(",");
            boolean isValid = false;

            if (parts.length > 0) {
                // 少なくとも1つの要素が存在し、その要素が数字であるかを確認する
                for (String part : parts) {
                    String trimmedPart = part.trim();
                    if (!trimmedPart.isEmpty()) {
                        try {
                            Integer.parseInt(trimmedPart);
                        } catch (NumberFormatException e) {
                            // 数字以外の要素があれば不適
                            isValid = false;
                            break;
                        }
                    }
                }
                
                if (isValid) {
                    // 1個以上の数字列がカンマで区切られているか？
                    // partsの要素が空でないものが1つ以上あれば、それは「1個以上の数字列」と見なせる。
                    // 例: "1,2" -> ["1", "2"] (2個)
                    // 例: "1," -> ["1", ""] (2個)
                    // 例: "," -> ["", ""] (2個) -> これは不適（数字列が0個）
                    
                    // 妥当なのは、数字列が1つ以上存在する場合。
                    boolean hasNumber = false;
                    for (String part : parts) {
                        if (!part.trim().isEmpty()) {
                            hasNumber = true;
                            break;
                        }
                    }
                    
                    if (hasNumber) {
                        validCount++;
                    }
                }
            }

        }

        System.out.println("valid=" + validCount);
    }
}
