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
        // 前後の空白を切り捨て
        String trimmed = line.trim();
        
        // 空行は妥当ではない
        if (trimmed.isEmpty()) {
            return false;
        }
        
        // 数字とカンマ以外を含む行は妥当ではない
        for (int i = 0; i < trimmed.length(); i++) {
            char c = trimmed.charAt(i);
            if (!Character.isDigit(c) && c != ',') {
                return false;
            }
        }
        
        // 空白区切りを考慮して分割（カンマで区切られた要素が少なくとも 1 つあるか確認）
        String[] parts = trimmed.split(",");
        
        // 各部分に数字が含まれているか確認
        for (String part : parts) {
            if (!part.isEmpty() && !Character.isDigit(part.charAt(0))) {
                return false;
            }
        }
        
        return true;
    }
}
