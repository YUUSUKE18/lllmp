import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;

        // カンマ区切りの整数列の妥当性を判定する正規表現
        // ^\s* : 行の先頭の空白を無視
        // (?:[0-9]+(?:,\s*[0-9]+)*) : 1つ以上の数字列と、その後にカンマと空白が続くパターンを繰り返す
        // (?:,\s*|$) : カンマと空白、または行末
        // $ : 行の終わり
        // この正規表現は「1個以上の数字列がカンマで区切られて並んでいる」ことを検証します。
        // よりシンプルに「数字とカンマのみで構成され、空行でない」ことを確認し、
        // その後、数字列が少なくとも1つ存在するかを確認する方が実用的です。

        // 仕様の「1 個以上の数字列がカンマで区切られて並んでいる」を厳密に解釈します。
        // これは、数字とカンマのみで構成され、かつ少なくとも1つの数字が含まれている必要があります。
        // 末尾のカンマは許容されます。

        // 判定ロジックを正規表現で実現します。
        // 1. 空行でないこと
        // 2. 数字とカンマ以外の文字を含まないこと
        // 3. 少なくとも1つの数字列が含まれていること (例: "1,2", "123" はOK, "," はNG)

        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 数字とカンマ以外の文字が含まれているかチェック
            // 許容される文字: 数字 (0-9), カンマ (,)
            if (!trimmedLine.matches("^[0-9,]*$")) {
                // 数字とカンマ以外の文字を含む行は妥当ではない
                continue;
            }

            // 少なくとも1つの数字列が含まれているかチェック
            // 数字列が一つもない場合（例: "," や "", ただし空行は既に除外済み）
            // 数字が含まれているかを確認するために、数字が一つ以上存在するかチェックします。
            if (!trimmedLine.matches(".*[0-9].*")) {
                // 数字が含まれていない場合（例: "," のみ、または空行だが既に除外済み）
                // ただし、" , " のようなカンマのみの行は、数字列が0個になるため不適。
                // 妥当なのは「1個以上の数字列」が並んでいること。
                // "1,2" -> OK
                // "," -> NG (数字列が0個)
                // "1," -> OK (数字列が1個)
                // ",1" -> OK (数字列が1個)
                
                // 厳密に「1個以上の数字列」が存在するかどうかをチェック
                // 数字列が一つ以上存在しないのは、行がカンマのみで構成されている場合のみ。
                // 例: " , " や "," のみ。
                
                // 少なくとも1つの数字が含まれているかを確認
                if (!trimmedLine.matches(".*[0-9].*")) {
                    // 数字が含まれていない場合は不妥当
                    continue;
                }
            }

            // 上記のチェックを通過した場合、行は妥当である
            validCount++;
        }

        System.out.println("valid=" + validCount);
    }
}
