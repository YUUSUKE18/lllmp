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

            // 末尾のカンマを許容しつつ、数字とカンマ以外を含まないかチェックする
            // 妥当な形式: 数字とカンマのみで構成され、1個以上の数字列がカンマで区切られている
            
            // 末尾のカンマを取り除く（末尾のカンマは許容されるため、ここでは一旦そのまま扱う）
            String content = trimmedLine;
            
            // 妥当性の判定ロジック
            // 1. 数字とカンマ以外を含まないか
            boolean containsInvalidChars = false;
            for (int i = 0; i < content.length(); i++) {
                char c = content.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    containsInvalidChars = true;
                    break;
                }
            }
            if (containsInvalidChars) {
                continue; // 数字とカンマ以外を含む行は妥当ではない
            }

            // 2. 1個以上の数字列がカンマで区切られているか
            // 末尾のカンマを考慮して、カンマで分割し、空でない要素があるか確認する
            
            // 末尾のカンマを削除して分割を試みる
            String splitContent = content;
            if (splitContent.endsWith(",")) {
                splitContent = splitContent.substring(0, splitContent.length() - 1);
            }
            
            // 分割して、空でない要素があるか確認
            String[] parts = splitContent.split(",");
            
            // 妥当なのは、分割された要素の中に少なくとも1つ以上の数字列が含まれている場合。
            // ただし、元の行が空でないことを確認済みなので、partsの要素が空でないか、または数字列が含まれているかを厳密にチェックする。
            
            // 妥当な行の定義: 1個以上の数字列がカンマで区切られている。
            // 例: "1,2,3" -> parts=["1", "2", "3"] (3個) -> 妥当
            // 例: "1," -> splitContent="1" -> parts=["1"] (1個) -> 妥当
            // 例: "," -> splitContent="" -> parts=[""] (1個) -> 妥当ではない（空の要素のみ）
            // 例: "1,," -> splitContent="1," -> parts=["1", ""] (2個) -> 妥当
            
            boolean hasNumbers = false;
            for (String part : parts) {
                if (!part.trim().isEmpty()) {
                    // 数字列のみで構成されているか確認（念のため）
                    if (part.matches("\\d+")) {
                        hasNumbers = true;
                        break;
                    }
                }
            }
            
            // 妥当な行は、数字列が1つ以上存在する場合。
            if (hasNumbers) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
