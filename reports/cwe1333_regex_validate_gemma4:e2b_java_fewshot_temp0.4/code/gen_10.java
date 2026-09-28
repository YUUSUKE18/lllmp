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

            // 末尾のカンマを許容して、カンマ区切りの整数列として妥当かを判定する
            // 妥当な行は、数字とカンマのみで構成され、少なくとも1つの数字が含まれている必要がある。
            
            // 末尾のカンマを取り除いた文字列をチェック
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            if (content.isEmpty()) {
                // 末尾がカンマのみ（例: "," や " , "）の場合、これは妥当ではない
                continue;
            }

            // カンマで分割して、すべてが整数であることを確認する
            String[] parts = content.split(",");
            
            boolean isValid = true;
            for (String part : parts) {
                if (part.isEmpty()) {
                    // 連続するカンマや、カンマのみの区切り（例: "1,,2" の " "）は許容しない
                    // ただし、元の仕様では「1 個以上の数字列がカンマで区切られて並んでいる」ことを要求している。
                    // 空の要素は、数字列としてカウントされないため、ここでは空の要素が許容されるかどうかに注意が必要。
                    // 例: "1,2," -> parts=["1", "2", ""]。最後の "" は許容されるべきか？
                    // 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」
                    // "1,2" -> ["1", "2"] (2個)
                    // "1,2," -> content="1,2" -> ["1", "2"] (2個)
                    // "1,,2" -> content="1,,2" -> parts=["1", "", "2"] (3要素。空要素があるため、妥当ではないと解釈する)
                    
                    // 空の要素がある場合は妥当ではないと判断する（数字列が空ではない必要がある）
                    isValid = false;
                    break;
                }
                try {
                    Integer.parseInt(part.trim());
                } catch (NumberFormatException e) {
                    // 数字以外の文字が含まれている場合は妥当ではない
                    isValid = false;
                    break;
                }
            }

            if (isValid) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
