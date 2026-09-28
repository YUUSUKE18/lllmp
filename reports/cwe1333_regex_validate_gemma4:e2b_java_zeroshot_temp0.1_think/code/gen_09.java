import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 1. 行の前後の空白を無視する (trim)
            String trimmedLine = line.trim();

            // 2. 空行は妥当ではない
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 3. 数字とカンマ以外を含む行は妥当ではない
            // 行が数字とカンマのみで構成されているかを確認
            boolean containsOnlyDigitsAndCommas = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    containsOnlyDigitsAndCommas = false;
                    break;
                }
            }

            if (!containsOnlyDigitsAndCommas) {
                continue;
            }

            // 4. 1個以上の数字列がカンマで区切られて並んでいるかを確認
            // 数字が一つでも含まれていれば、それは妥当であると見なす
            boolean containsAtLeastOneDigit = false;
            for (int i = 0; i < trimmedLine.length(); i++) {
                if (Character.isDigit(trimmedLine.charAt(i))) {
                    containsAtLeastOneDigit = true;
                    break;
                }
            }

            if (containsAtLeastOneDigit) {
                validCount++;
            }
        }

        // 5. 結果を出力
        System.out.println("valid=" + validCount);
    }
}
