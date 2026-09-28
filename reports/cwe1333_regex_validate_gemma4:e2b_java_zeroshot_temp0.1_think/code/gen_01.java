import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        int validCount = 0;
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;

        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();

            // 1. 空行の判定
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 2. 数字とカンマ以外の文字が含まれていないか判定
            boolean isValidStructure = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                // 数字 (0-9) または カンマ (,) 以外が含まれていたら無効
                if (!Character.isDigit(c) && c != ',') {
                    isValidStructure = false;
                    break;
                }
            }

            if (isValidStructure) {
                // 構造が妥当であれば、有効な行としてカウント
                validCount++;
            }
        }

        // 結果を出力
        System.out.println("valid=" + validCount);
    }
}
