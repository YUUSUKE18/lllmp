import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            String trimmed = line.trim();
            if (trimmed.isEmpty()) {
                continue;
            }
            
            // 空白以外の文字が含まれているかチェック（カンマと数字のみ許容）
            boolean hasInvalidChar = false;
            for (int i = 0; i < trimmed.length(); i++) {
                char c = trimmed.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    hasInvalidChar = true;
                    break;
                }
            }
            
            if (hasInvalidChar) {
                continue;
            }
            
            // 最初の文字が数字かカンマかチェック（空行や空白のみは既に除外済み）
            char firstChar = trimmed.charAt(0);
            if (!Character.isDigit(firstChar) && firstChar != ',') {
                continue;
            }
            
            // カンマ区切りの整数列として解析可能か判定
            String[] parts = trimmed.split(",");
            boolean isValid = true;
            
            for (String part : parts) {
                if (part.isEmpty()) {
                    isValid = false;
                    break;
                }
                try {
                    Integer.parseInt(part);
                } catch (NumberFormatException e) {
                    isValid = false;
                    break;
                }
            }
            
            if (isValid) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
