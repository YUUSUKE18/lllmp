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

        // 空白文字列が含まれていないか確認（trim 以外で空白がある場合）
        for (int i = 0; i < trimmed.length(); i++) {
            char c = trimmed.charAt(i);
            if (!Character.isDigit(c) && c != ',') {
                return false;
            }
        }

        // カンマ区切りの整数列として解析
        String[] parts = trimmed.split(",");
        
        // 各部分が有効な整数であるか確認
        for (String part : parts) {
            if (part.isEmpty()) {
                return false;
            }
            try {
                Integer.parseInt(part);
            } catch (NumberFormatException e) {
                return false;
            }
        }

        return true;
    }
}
