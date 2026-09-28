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
            // ^\s*            -> 行の先頭の任意の空白文字
            // (?:[0-9]+,\s*)* -> 数字とカンマのペアが0回以上繰り返される (数字+カンマ+任意空白)
            // [0-9]+         -> 少なくとも1つの数字
            // (?:,\s*[0-9]+)* -> 続くカンマと数字のペアが0回以上繰り返される
            // \s*$           -> 行末の任意の空白文字
            // この正規表現は「カンマ区切りの整数列」を厳密に定義するのは複雑なため、
            // 以下のロジックで「1個以上の数字列がカンマで区切られて並んでいる」ことを確認します。

            // 妥当性の判定ロジック:
            // 1. 行をトリムする。
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 2. 末尾のカンマを許容しつつ、カンマで区切られた数字列が存在するか確認する
            // 末尾のカンマを削除して、カンマで分割された要素がすべて整数であることを確認する
            String processedLine = trimmedLine;
            
            // 末尾のカンマが続く場合、それを除去して分割を試みる
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // カンマで分割し、各要素が整数であることを確認する
            String[] parts = processedLine.split(",");
            
            boolean isValid = false;
            if (parts.length > 0) {
                // 少なくとも1つの要素が存在し、その要素がすべて整数であることを確認する
                for (String part : parts) {
                    if (part.trim().isEmpty()) {
                        // 空の要素（例: "1,,2" のカンマの連続）は許容しない（ただし、末尾のカンマは許容される）
                        // ここでは、有効な数字列が1個以上存在すればOKとする。
                        continue;
                    }
                    try {
                        Integer.parseInt(part.trim());
                    } catch (NumberFormatException e) {
                        // 数字以外が含まれていれば不妥当
                        isValid = false;
                        break;
                    }
                }
                
                if (isValid) {
                    // 1個以上の数字列がカンマで区切られている（つまり、分割された要素が意味を持つ）
                    // 例: "1,2" -> parts=["1", "2"] (2個)
                    // 例: "1," -> processedLine="1" -> parts=["1"] (1個)
                    // 例: "," -> processedLine="" -> parts=[""] (1個, 空文字列) -> isValid=falseになるはず
                    
                    // 妥当な行の定義: 1個以上の数字列がカンマで区切られていること。
                    // 処理上、数字列が1つ以上存在し、かつそれがカンマで区切られている必要がある。
                    // 例: "1" は妥当ではない（カンマがないため）
                    // 例: "1," は妥当。
                    
                    // 最初のチェックとして、分割された要素の数が1以上であり、かつ、
                    // 実際に数字が含まれていたことを確認する。
                    
                    // より厳密に、「1個以上の数字列がカンマで区切られている」を正規表現で表現する。
                    // 数字とカンマの組み合わせが連続していることを確認する。
                    
                    // ここでは、上記ロジックで数字のみがカンマで区切られていることを確認した。
                    // 少なくとも1つの要素が数字として解析できた場合、それは妥当と見なす。
                    validCount++;
                }
            }
        }

        System.out.println("valid=" + validCount);
    }
}
