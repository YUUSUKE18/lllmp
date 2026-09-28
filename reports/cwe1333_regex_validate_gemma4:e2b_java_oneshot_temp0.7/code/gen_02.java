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

            // カンマ区切りの整数列として妥当であるか判定
            // 末尾のカンマは許容する
            boolean isValid = true;
            
            // 末尾のカンマがあればそれを除去して処理
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // カンマで分割して、各要素が整数であるか確認
            String[] parts = content.split(",");
            
            if (parts.length == 0) {
                // 空の文字列が分割された場合（例: "," または "" の後にカンマが続く場合）
                isValid = false;
            } else {
                for (String part : parts) {
                    if (part.isEmpty()) {
                        // カンマが連続している場合（例: "1,,2"）や、空の要素がある場合
                        // ただし、末尾のカンマは許容するため、splitの結果が空文字列を含むかどうかを注意深く見る必要がある。
                        // ここでは、カンマ区切りで数字のみが続くことを期待する。
                        // 例: "1,2," -> parts = ["1", "2", ""]。最後の""は末尾のカンマに対応。
                        // 妥当なのは「1個以上の数字列がカンマで区切られている」こと。
                        // したがって、空の要素が一つでもあれば、それは妥当ではないと見なすのが安全。
                        isValid = false;
                        break;
                    }
                    try {
                        Integer.parseInt(part.trim());
                    } catch (NumberFormatException e) {
                        // 数字とカンマ以外を含む行は妥当ではない
                        isValid = false;
                        break;
                    }
                }
            }

            if (isValid) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
