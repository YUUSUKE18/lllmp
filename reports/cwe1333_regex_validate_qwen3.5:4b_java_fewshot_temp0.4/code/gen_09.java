import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<Integer> numbers = new ArrayList<>();
        int validLines = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            // 空白を除去して処理
            String trimmedLine = line.trim();
            
            // 空行は妥当でない
            if (trimmedLine.isEmpty()) {
                continue;
            }
            
            // カンマ区切りの整数列として解析
            List<String> parts = new ArrayList<>();
            int count = 0;
            int lastPos = -1;
            
            // 末尾のカンマを考慮して分割
            if (trimmedLine.endsWith(",")) {
                String content = trimmedLine.substring(0, trimmedLine.length() - 1);
                parts.add(content);
            } else {
                parts.add(trimmedLine);
            }
            
            boolean isValid = true;
            
            for (String part : parts) {
                // 空白が含まれていないか確認（trim 済みだが、内部に空白がないか）
                if (part.contains(" ")) {
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
            
            // 妥当性の判定ロジック
            // 1. 部分リストが空でないか
            if (parts.isEmpty()) {
                isValid = false;
            } 
            // 2. 各部分が整数であるか（上記 try-catch で確認済み）
            // 3. 空白が含まれていないか（上記で確認済み）
            
            if (isValid) {
                validLines++;
            }
        }
        
        System.out.println("valid=" + validLines);
    }
}
