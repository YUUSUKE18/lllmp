import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            // 前後の空白を除去
            line = line.trim();
            
            // 空行の場合は無効
            if (line.isEmpty()) {
                continue;
            }
            
            // 数字とカンマ以外が含まれていないかチェック
            boolean hasInvalidChar = false;
            for (char c : line.toCharArray()) {
                if (!Character.isDigit(c) && c != ',') {
                    hasInvalidChar = true;
                    break;
                }
            }
            
            if (hasInvalidChar) {
                continue;
            }
            
            // 分割して非空要素があるか確認
            String[] parts = line.split(",");
            for (String part : parts) {
                if (!part.isEmpty()) {
                    validCount++;
                    break;
                }
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
