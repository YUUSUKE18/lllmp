import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
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

            // 末尾のカンマを許容しつつ、カンマ区切りの整数列として妥当か判定する
            // 末尾のカンマがあっても、カンマで区切られた数字列が存在すれば妥当とする。
            // ただし、仕様では「1 個以上の数字列がカンマで区切られて並んでいること」が妥当の定義。
            // 末尾のカンマがあっても、その直前までが数字列として扱われる。

            // 末尾のカンマを取り除いて、カンマで分割してみる
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // カンマで分割して、空でない要素が1つ以上あるか確認する
            String[] parts = content.split(",");
            
            // 妥当な行であるためには、分割された要素の中に少なくとも1つの数字列が含まれている必要がある。
            // 空行チェックで既に空行は除外しているため、ここではpartsの要素数や内容をチェックする。
            // 1個以上の数字列がカンマで区切られて並んでいること。
            // 例: "1,2,3" -> parts=["1", "2", "3"] (3個の数字列) -> 妥当
            // 例: "1," -> content="1" -> parts=["1"] (1個の数字列) -> 妥当
            // 例: "," -> content="" -> parts=[""] (1個の空文字列) -> 妥当ではない（空行チェックで除外済みだが、念のため）
            
            boolean is_valid = false;
            for (String part : parts) {
                if (!part.trim().isEmpty()) {
                    // 各部分が整数であるかチェックする（仕様では「数字列」とあるため、ここでは整数に変換可能かを確認する）
                    try {
                        Integer.parseInt(part.trim());
                        is_valid = true;
                        break; // 1つでも有効な数字列があればOK
                    } catch (NumberFormatException e) {
                        // 数字列でなかった場合はスキップ
                    }
                }
            }

            if (is_valid) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
