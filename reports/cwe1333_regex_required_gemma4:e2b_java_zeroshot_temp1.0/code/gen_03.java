import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視
            String trimmedLine = line.trim();

            // 妥当性の判定のための正規表現
            // 要件: 1個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容。
            // 正規表現の解説:
            // ^: 行の開始
            // (?:[0-9]+(?:,[0-9]+)*): 1つ以上の数字列がカンマで区切られるパターン
            // (?:,|$): 区切り文字（カンマまたは行末）
            // このパターンは、カンマ区切りの数値列が少なくとも1つ存在することを保証する必要があります。
            
            // より厳密に「カンマ区切りの整数列」が並んでいるかを検証します。
            // 許容されるパターン: 数字、カンマ、数字の繰り返し。行全体がこれらに一致するか。
            // 少なくとも1つの数字列が存在する必要があります。
            
            // 正規表現: 1つ以上の数字とカンマの組み合わせが存在することを確認する。
            // (?:[0-9]+(?:,[0-9]+)*) は、数字とカンマの組み合わせが1回以上繰り返されることを意味します。
            // 末尾のカンマは許容されます。
            String regex = "^(?:[0-9]+(?:,[0-9]+)*)(?:,)?*$" ;

            // 空行判定と、数字とカンマ以外の文字のチェック
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 行全体が上記のパターンに一致するかをチェック
            // この正規表現は、数字とカンマのみで構成され、少なくとも1つの数字列を含むことを確認します。
            // 末尾のカンマが許容されるため、`$` の直前にカンマが来るか、カンマで終わる必要があります。
            // 意図された要件: 1個以上の数字列がカンマで区切られて並んでいる。
            
            // 正規表現を再考: 
            // 1個以上の数字列がカンマで区切られていること。末尾のカンマは許容。
            // 例: "1,2,3" -> OK
            // 例: "1,2," -> OK (末尾のカンマ許容)
            // 例: "1" -> OK
            // 例: "," -> NG (数字列がない)
            // 例: "abc" -> NG
            // 例: "1,a" -> NG

            // 少なくとも1つの数字列が存在し、それらがカンマで区切られている、または単一の数字列であること。
            // 最小のパターンは「数字列」の存在です。
            // パターンA: 数字列のシーケンス（カンマを含む）
            // ^\s*(\d+(?:,\d+)*)(?:,)?\s*$ 
            // これは、カンマ区切りで始まることを要求し、末尾のカンマは任意とします。

            // 要件に合わせて、行全体が「数字とカンマのみ」で構成され、かつ「少なくとも1つの数字列」を含むことを確認します。
            // (?:[0-9]+(?:,[0-9]+)*) は、1個以上の数字列がカンマで区切られているパターン。
            // 末尾のカンマが許容されるため、その後にカンマが0回以上続くことを許容する必要があります。
            
            // 最終的な判定ロジック:
            // 1. 行が空でないこと（既にchecked）
            // 2. 行が数字とカンマのみで構成されていること。
            // 3. その中で、少なくとも1つの数字列が存在すること。

            // 念のため、数字とカンマ以外が含まれていないかチェック
            boolean containsOnlyDigitsAndCommas = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!((c >= '0' && c <= '9') || c == ',')) {
                    containsOnlyDigitsAndCommas = false;
                    break;
                }
            }

            if (!containsOnlyDigitsAndCommas) {
                continue; // 数字とカンマ以外を含む行は不妥当
            }

            // 少なくとも1つの数字列が存在するかチェック (例: ",," はNG)
            boolean containsAtLeastOneNumber = false;
            for (int i = 0; i < trimmedLine.length(); i++) {
                if (trimmedLine.charAt(i) >= '0' && trimmedLine.charAt(i) <= '9') {
                    containsAtLeastOneNumber = true;
                    break;
                }
            }

            if (containsAtLeastOneNumber) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
