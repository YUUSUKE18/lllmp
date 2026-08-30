import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int validCount = 0;
        
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }

            List<String> parts = new ArrayList<>();
            StringBuilder sb = new StringBuilder();

            boolean hasDigit = false;
            
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                
                if (Character.isDigit(c)) {
                    hasDigit = true;
                    sb.append(c);
                } else if (c == ',') {
                    parts.add(sb.toString().trim());
                    sb.setLength(0); // Clear buffer
                } else {
                    // 数字やカンマ以外の文字が見つかった場合、不適格
                    System.exit(1); 
                }
            }
            
            // 最後の部分を追加
            if (sb.length() > 0 || parts.isEmpty()) {
                parts.add(sb.toString().trim());
            }

            // 部分が空でないか確認
            boolean isInvalid = false;
            for (String part : parts) {
                if (part.isEmpty()) {
                    isInvalid = true;
                    break;
                }
            }

            if (!isInvalid && !parts.isEmpty()) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
