import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // カンマ区切りの整数列として妥当か判定
            // 末尾のカンマは許容する
            // 1個以上の数字列がカンマで区切られて並んでいること
            
            // 末尾のカンマを取り除く（末尾のカンマが許容されるため、それを取り除いて分割する）
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }
            
            // カンマで分割
            String[] parts = content.split(",");
            
            // 分割された要素が空でないこと（つまり、数字列が存在すること）をチェック
            boolean isValid = false;
            for (String part : parts) {
                if (!part.trim().isEmpty()) {
                    // 数字としてパース可能かチェック（厳密には整数列のみを想定）
                    try {
                        Integer.parseInt(part.trim());
                        isValid = true;
                        break; // 1個でも有効な数字列があればOK
                    } catch (NumberFormatException e) {
                        // 数字以外が含まれていれば妥当ではない
                        isValid = false;
                        break;
                    }
                }
            }

            // 妥当な行のカウント
            if (isValid) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
