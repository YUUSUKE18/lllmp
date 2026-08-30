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

            // カンマ区切りの整数列として妥当か判定
            // 妥当なのは、1個以上の数字列がカンマで区切られている場合。
            // 末尾のカンマは許容される。
            
            // 1. 末尾のカンマを取り除く（末尾のカンマは許容されるため、区切り文字として扱う）
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // 2. カンマで分割し、各要素が整数であるか確認する
            String[] parts = processedLine.split(",");
            
            boolean isValid = true;
            if (parts.length == 0) {
                // これは空行チェックで既に除外されているはずだが、念のため
                isValid = false;
            } else {
                for (String part : parts) {
                    // 各部分が空でないこと、かつ整数であることを確認
                    if (part.isEmpty()) {
                        // カンマが連続している場合（例: "1,,2" や ",1" など）
                        // 仕様では「1個以上の数字列がカンマで区切られて並んでいる」必要がある。
                        // 空の要素は許容されないと解釈する。
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
