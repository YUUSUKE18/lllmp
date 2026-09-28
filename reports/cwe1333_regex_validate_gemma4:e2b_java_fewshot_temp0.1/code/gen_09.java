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

            // 末尾のカンマを許容しつつ、カンマ区切りの整数列として妥当かを判定する
            // 妥当な行は、数字とカンマのみで構成され、少なくとも1つの数字が含まれている必要がある。
            
            // 末尾のカンマを取り除いた文字列をチェック
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // カンマで分割して、すべてが整数であることを確認する
            String[] parts = content.split(",");
            
            boolean isValid = true;
            if (parts.length == 0) {
                // カンマのみ、または空文字列（trim()で除去済みだが念のため）
                isValid = false;
            } else {
                for (String part : parts) {
                    if (part.isEmpty()) {
                        // カンマが連続している場合（例: ",," や "1,,2" のようなケース。ただし、split(",")は空文字列を生成する）
                        // 厳密には、数字列がカンマで区切られている必要がある。
                        // 例: "1,2," -> parts=["1", "2", ""]。空文字列は許容されるか？
                        // 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」
                        // 空の要素は数字列ではないため、空要素があれば不妥当とする。
                        isValid = false;
                        break;
                    }
                    try {
                        Integer.parseInt(part.trim());
                    } catch (NumberFormatException e) {
                        // 数字以外の文字が含まれていた場合
                        isValid = false;
                        break;
                    }
                }
            }

            if (isValid) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
