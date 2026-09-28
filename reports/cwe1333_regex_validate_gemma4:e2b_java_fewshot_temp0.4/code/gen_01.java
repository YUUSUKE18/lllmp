import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して処理
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを許容しつつ、数字とカンマのみで構成されているかチェックする
            // 妥当な形式: 数字とカンマのみで構成され、1個以上の数字列があること。
            // 末尾のカンマは許容される。
            
            // 1. 数字とカンマ以外が含まれていないかチェック
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

            // 2. 1個以上の数字列がカンマで区切られているかチェック
            // 末尾のカンマは許容される。
            
            // 末尾のカンマを取り除く（もしあれば）
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }
            
            // カンマで分割して、空でない要素が1つ以上あるかチェック
            String[] parts = processedLine.split(",");
            
            // 処理後の文字列が空でなければ、分割された要素が1つ以上存在するか確認する
            // 例: "1,2,3" -> parts = {"1", "2", "3"} (長さ3) -> 妥当
            // 例: "1," -> processedLine = "1" -> parts = {"1"} (長さ1) -> 妥当
            // 例: "," -> processedLine = "" -> parts = {""} (長さ1) -> 妥当ではない (空行として扱われるべきだが、ここでは空行チェックで除外済み)
            
            // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
            // 最初のチェックで空行は除外済み。
            // 処理後の文字列が空でなければ、少なくとも1つの数字列が存在する。
            if (!processedLine.isEmpty()) {
                // 少なくとも1つの数字列が存在する（カンマ区切りなので、数字列が1つ以上あればOK）
                validLines++;
            } else {
                // processedLineが空になった場合 (元の行がカンマのみだった場合、例: "," または ",," など)
                // このケースは、元の行が数字列を含んでいないため、既に除外されているか、
                // またはカンマのみで構成されていた場合。
                // 例: "," -> processedLine="" -> 妥当ではない
                // 例: " , " -> trimmedLine="" -> 既に除外
                // 例: "," -> processedLine="" -> 妥当ではない
                // 妥当なのは、数字列が1つ以上含まれている場合のみ。
                // 最初のチェックで数字とカンマ以外が含まれていないことを確認済み。
                // したがって、processedLineが空でなければ、少なくとも1つの数字列が存在する。
                // processedLineが空の場合、それは数字列を含まないため、妥当ではない。
            }
        }

        System.out.println("valid=" + validLines);
    }
}
