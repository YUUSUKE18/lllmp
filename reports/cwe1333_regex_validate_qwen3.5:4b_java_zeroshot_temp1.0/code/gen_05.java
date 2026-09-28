import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        
        String line;
        while ((line = reader.readLine()) != null) {
            // 前後の空白を切り捨てて処理する
            String trimmedLine = line.trim();
            
            // 空行や文字列が含まれる場合は無効
            if (trimmedLine.isEmpty() || trimmedLine.contains("[^0-9,]")) {
                continue;
            }
            
            // カンマで分割し、各要素が整数かチェックする
            String[] parts = trimmedLine.split(",");
            boolean isNumeric = true;
            
            for (String part : parts) {
                if (part.isEmpty()) {
                    isNumeric = false;
                    break;
                }
                // 数字のみか確認（カンマが含まれることは分割により不可能だが、安全のため）
                if (!part.matches("[0-9]+")) {
                    isNumeric = false;
                    break;
                }
            }
            
            if (isNumeric) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
