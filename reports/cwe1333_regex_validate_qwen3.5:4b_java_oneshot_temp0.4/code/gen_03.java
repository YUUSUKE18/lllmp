import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            line = line.trim();
            
            if (line.isEmpty()) {
                continue;
            }
            
            // 空白とカンマ以外の文字が含まれていないかチェック
            boolean hasInvalidChar = false;
            for (char c : line.toCharArray()) {
                if (c != ' ' && c != '\t' && c != ',' && !Character.isDigit(c)) {
                    hasInvalidChar = true;
                    break;
                }
            }
            
            if (hasInvalidChar) {
                continue;
            }
            
            // カンマ区切りの整数列として妥当か判定
            String[] parts = line.split(",");
            boolean allValid = true;
            
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) {
                    allValid = false;
                    break;
                }
                
                try {
                    Integer.parseInt(part);
                } catch (NumberFormatException e) {
                    allValid = false;
                    break;
                }
            }
            
            if (allValid) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
