import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();

            // 1. 空行の判定
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 2. 数字とカンマ以外を含む行の判定
            // 行が数字、カンマ、空白のみで構成されているかを確認する
            boolean containsInvalidChars = false;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',' && !Character.isWhitespace(c)) {
                    containsInvalidChars = true;
                    break;
                }
            }
            if (containsInvalidChars) {
                continue;
            }

            // 3. 1個以上の数字列がカンマで区切られて並んでいるかを確認する
            // カンマで分割し、非空の数字列が存在するかを確認する
            String[] tokens = trimmedLine.split(",");
            boolean hasNumberSequence = false;

            for (String token : tokens) {
                // トークンをトリムして、空でないかを確認する
                String trimmedToken = token.trim();
                if (!trimmedToken.isEmpty()) {
                    // トークンが純粋な整数列であるかを確認する
                    // (仕様上、数字列がカンマで区切られていることが重要。ここでは、トークンが数字のみで構成されていることを確認する)
                    try {
                        // 数字列としてパースを試みる
                        Long.parseLong(trimmedToken);
                        hasNumberSequence = true;
                    } catch (NumberFormatException e) {
                        // トークンが数字列でなかった場合（例: "a"など、これは上記2のチェックで既に除外されているはずだが念のため）
                        // ただし、仕様上は「数字列」が求められているため、数字以外の文字が含まれていれば無効とする。
                        // ここでは、トークンが数字のみで構成されていることを確認する。
                        // もしトークンが数字以外の文字を含んでいたら、それは「数字列」ではないため、hasNumberSequenceはfalseのまま。
                    }
                }
            }

            if (hasNumberSequence) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
