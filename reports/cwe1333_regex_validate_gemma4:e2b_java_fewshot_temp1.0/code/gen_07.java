import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;

        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを除去した後に、カンマで分割し、少なくとも1つの要素があるか確認する
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // カンマで分割
            String[] parts = processedLine.split(",");

            // 妥当性の判定: 1個以上の数字列がカンマで区切られて並んでいること
            boolean isValid = false;
            for (String part : parts) {
                if (!part.trim().isEmpty()) {
                    try {
                        // 各要素が整数であることを確認
                        Integer.parseInt(part.trim());
                        isValid = true;
                        break; // 少なくとも1つ数字列があればOK
                    } catch (NumberFormatException e) {
                        // 数字列以外が含まれていた場合、この行は妥当ではない
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
