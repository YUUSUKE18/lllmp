import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new InputStreamReader(System.in);
        int validCount = 0;
        String line;
        while ((line = br.readLine()) != null) {
            if (isValid(line)) {
                validCount++;
            }
        }
        System.out.println("valid=" + validCount);
    }

    private static boolean isValid(String line) {
        // 行の前後の空白は無視します
        String trimmed = line.trim();
        
        // 空行は妥当ではありません
        if (trimmed.isEmpty()) {
            return false;
        }

        // 数字とカンマ以外を含む行は妥当ではありません
        for (int i = 0; i < trimmed.length(); i++) {
            char c = trimmed.charAt(i);
            if (!Character.isDigit(c) && c != ',') {
                return false;
            }
        }

        // 1 個以上の数字列がカンマで区切られて並んでいること
        String[] parts = trimmed.split(",");
        int count = 0;
        for (String part : parts) {
            if (part.isEmpty()) {
                continue;
            }
            boolean allDigits = true;
            for (int j = 0; j < part.length(); j++) {
                if (!Character.isDigit(part.charAt(j))) {
                    allDigits = false;
                    break;
                }
            }
            if (allDigits) {
                count++;
            }
        }

        return count >= 1;
    }
}
