import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = reader.readLine()) != null) {
            if (isValid(line)) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
    
    private static boolean isValid(String line) {
        // 前後の空白を除去
        String trimmed = line.trim();
        
        // 空行は妥当ではない
        if (trimmed.isEmpty()) {
            return false;
        }
        
        // 数字とカンマ以外が含まれていないか確認するために、すべての文字が [0-9, ,] のみであるかチェック
        for (int i = 0; i < trimmed.length(); i++) {
            char c = trimmed.charAt(i);
            if (!Character.isDigit(c) && c != ',') {
                return false;
            }
        }
        
        // カンマがない場合、数字列が 1 個以上あるか確認 (StringTokenizer で分割してサイズを確認)
        StringTokenizer tokenizer = new StringTokenizer(trimmed);
        if (!tokenizer.hasMoreTokens()) {
            return false;
        }
        
        int count = 0;
        while (tokenizer.hasMoreTokens()) {
            String token = tokenizer.nextToken();
            // トークンが空でないか確認 (カンマのみの場合など)
            if (token.isEmpty()) {
                continue;
            }
            count++;
        }
        
        return count > 0;
    }
}
