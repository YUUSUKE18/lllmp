import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して、行をトリムする
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを許容しつつ、カンマ区切りの整数列として妥当かを判定する
            // 妥当な行は「1個以上の数字列がカンマで区切られて並んでいる」こと。
            // 末尾のカンマは許容される。
            
            // 1. 末尾のカンマを取り除く（もしあれば）
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // 2. カンマで分割して、空でない要素が整数であることを確認する
            String[] parts = content.split(",");
            
            boolean isValid = false;
            if (parts.length > 0) {
                // 1個以上の数字列がカンマで区切られて並んでいる必要がある
                for (String part : parts) {
                    String trimmedPart = part.trim();
                    if (!trimmedPart.isEmpty()) {
                        try {
                            Integer.parseInt(trimmedPart);
                            // 1つでも有効な数字列があれば、その行は妥当である
                            isValid = true;
                            break;
                        } catch (NumberFormatException e) {
                            // 数字以外のものが含まれていれば、その行は妥当ではない
                            isValid = false;
                            break;
                        }
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
