import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        int validCount = 0;
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視するため、まずトリムする
            String trimmedLine = line.trim();

            // 1. 空行は妥当ではない
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 2. 数字とカンマ以外を含む行は妥当ではない
            boolean isValidContent = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                // 数字 (0-9) または カンマ (,) のみ許可する
                if (!((c >= '0' && c <= '9') || c == ',')) {
                    isValidContent = false;
                    break;
                }
            }

            if (isValidContent) {
                validCount++;
            }
        }

        // 妥当な行数を出力
        System.out.println("valid=" + validCount);
    }
}
