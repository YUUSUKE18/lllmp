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

            // 末尾のカンマを除去して分割を試みる
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // カンマで分割
            String[] parts = content.split(",");

            // 1個以上の数字列がカンマで区切られて並んでいるか判定する。
            // partsの長さが0より大きいこと、および各要素が空でないことを確認する
            boolean isValid = false;
            if (parts.length > 0) {
                for (String part : parts) {
                    if (!part.trim().isEmpty()) {
                        // 全ての要素が整数であるかを確認する
                        try {
                            Integer.parseInt(part.trim());
                        } catch (NumberFormatException e) {
                            // 数字でない要素が含まれている場合は無効
                            isVaild = false;
                            break;
                        }
                    }
                }
            }

            if (isVaild) {
                // 数字列が1個以上存在し、それらがカンマで区切られている
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
