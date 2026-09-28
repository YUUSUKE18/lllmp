import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して処理
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを許容して、カンマ区切りの整数列として妥当かを判定する
            // 妥当なのは、数字とカンマのみで構成され、1個以上の数字列がカンマで区切られている場合。
            // 末尾のカンマは許容される。

            // 1. 数字とカンマ以外の文字が含まれていないかチェック
            boolean containsOnlyDigitsAndCommas = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    containsOnlyDigitsAndCommas = false;
                    break;
                }
            }

            if (!containsOnlyDigitsAndCommas) {
                continue; // 数字とカンマ以外を含む行は妥当ではない
            }

            // 2. カンマ区切りの整数列として妥当かチェック
            // 妥当なのは、1個以上の数字列がカンマで区切られている場合。
            // 末尾のカンマは許容される。

            // 末尾のカンマを削除して、カンマで分割してみる
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // カンマで分割して、空でない要素が1つ以上あるかチェックする
            String[] parts = processedLine.split(",");

            // 処理された行が空でなければ、分割された要素の数が1以上であれば妥当
            // ただし、元の行がカンマのみ（例: ","）や数字のみ（例: "123"）の場合の扱いを考慮する。

            // 妥当な条件: 1個以上の数字列がカンマで区切られていること。
            // 例: "1,2,3" -> parts.length == 3 (OK)
            // 例: "1," -> processedLine="1" -> parts.length == 1 (OK)
            // 例: "," -> processedLine="" -> parts.length == 1 (空文字列の分割は特殊)

            // 厳密に「1個以上の数字列がカンマで区切られて並んでいること」を判定する。
            // これは、カンマで区切った結果、少なくとも1つの数字列が存在すれば良い。
            
            boolean isCommaSeparated = false;
            for (String part : parts) {
                if (!part.isEmpty()) {
                    isCommaSeparated = true;
                    break;
                }
            }

            if (isCommaSeparated) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
