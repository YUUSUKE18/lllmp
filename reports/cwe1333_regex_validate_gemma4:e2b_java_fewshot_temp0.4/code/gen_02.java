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

            // 末尾のカンマを許容しつつ、カンマ区切りの整数列として妥当か判定する
            // 妥当な行は、数字とカンマのみで構成され、少なくとも1つの数字が含まれている必要がある。
            
            // 末尾のカンマを取り除く（末尾のカンマは許容されるため、ここでは一旦そのまま扱う）
            String content = trimmedLine;
            
            // 末尾のカンマがあれば取り除く（例: "1,2," -> "1,2"）
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // カンマで分割して、すべてが整数であることを確認する
            String[] parts = content.split(",");
            
            boolean isValid = true;
            if (parts.length == 0) {
                // これは空行チェックで既に除外されているはずだが念のため
                isValid = false;
            } else {
                for (String part : parts) {
                    if (part.isEmpty()) {
                        // カンマが連続している場合（例: ",,"）や、数字とカンマ以外の文字が含まれている場合
                        // ただし、split(",")の結果、空文字列はカンマが連続している場合に発生する。
                        // 例: "1,,2" -> ["1", "", "2"]
                        // 妥当性の定義：「1 個以上の数字列がカンマで区切られて並んでいる」
                        // これは、空の要素が許容されないことを意味する。
                        isValid = false;
                        break;
                    }
                    try {
                        Integer.parseInt(part.trim());
                    } catch (NumberFormatException e) {
                        // 数字以外が含まれていた場合
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
