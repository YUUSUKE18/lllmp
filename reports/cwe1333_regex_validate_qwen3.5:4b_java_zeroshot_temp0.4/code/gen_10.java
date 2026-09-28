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
            if (isValidLine(line)) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
    
    private static boolean isValidLine(String line) {
        // 前後の空白を除去して空行チェック
        String trimmed = line.trim();
        if (trimmed.isEmpty()) {
            return false;
        }
        
        StringTokenizer st = new StringTokenizer(trimmed, ",");
        
        // 少なくとも 1 つの数字列がいること、かつ他の文字がないことを確認
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            // 数字のみであるかチェック
            for (int i = 0; i < token.length(); i++) {
                char c = token.charAt(i);
                if (!Character.isDigit(c)) {
                    return false;
                }
            }
        }
        
        // トークンがすべて処理されたら OK
        return true;
    }
}
