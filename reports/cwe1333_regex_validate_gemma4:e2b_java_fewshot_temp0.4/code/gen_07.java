import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して、カンマ区切りでチェックする
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを除去して、カンマで分割する
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // カンマで分割
            String[] parts = content.split(",");

            // 1個以上の数字列がカンマで区切られて並んでいるか判定する
            boolean isValid = false;
            for (String part : parts) {
                if (!part.trim().isEmpty()) {
                    try {
                        // 数字としてパースできるか試みる
                        Integer.parseInt(part.trim());
                        isValid = true;
                        break; // 1つでも有効な数字列があればOK
                    } catch (NumberFormatException e) {
                        // 数字でない場合はスキップ（ただし、仕様上は数字列のみが期待される）
                        // ここでは、"数字列がカンマで区切られて並んでいる"ことを確認するため、
                        // 少なくとも1つの要素が数字としてパース可能であることを確認する。
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
