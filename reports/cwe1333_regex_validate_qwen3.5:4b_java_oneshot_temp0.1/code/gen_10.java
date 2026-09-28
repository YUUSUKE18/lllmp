import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
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
        if (line == null || line.trim().isEmpty()) {
            return false;
        }

        String trimmed = line.trim();
        if (trimmed.isEmpty()) {
            return false;
        }

        // 空白以外の文字が含まれているかチェック（カンマと数字のみが許容される）
        for (int i = 0; i < trimmed.length(); i++) {
            char c = trimmed.charAt(i);
            if (!Character.isDigit(c) && c != ',') {
                return false;
            }
        }

        // カンマ区切りの整数列として妥当かチェック
        String[] parts = trimmed.split(",");
        
        // 空行や数字とカンマ以外を含む行は妥当ではないので、
        // ここでは split で空文字列が生成されるケースも考慮する必要がある。
        // ただし、split は末尾のカンマの場合、空文字列を生成しない（Java の仕様）が、
        // 入力に「1 個以上の数字列」が含まれているか確認する必要がある。
        
        boolean hasNumber = false;
        for (String part : parts) {
            if (part.isEmpty()) {
                continue;
            }
            try {
                Integer.parseInt(part);
                hasNumber = true;
            } catch (NumberFormatException e) {
                return false;
            }
        }

        // 1 個以上の数字列があるか確認
        if (!hasNumber) {
            return false;
        }

        return true;
    }
}
