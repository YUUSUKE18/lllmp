import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            // 前後の空白を除去して処理対象にする
            String trimmedLine = line.trim();
            
            // 空行は妥当ではない
            if (trimmedLine.isEmpty()) {
                continue;
            }
            
            // 文字列をカンマで分割し、トークン化
            StringTokenizer st = new StringTokenizer(trimmedLine, ",");
            boolean isValid = true;
            
            // トークンが少なくとも 1 つあるか確認
            if (!st.hasMoreTokens()) {
                isValid = false;
            } else {
                // 各トークンを整数として解析し、数字のみであることを確認
                while (st.hasMoreTokens()) {
                    String token = st.nextToken();
                    
                    // トークンに空白が含まれているかチェック（カンマ区切りなので本来は含まれないはずだが安全のため）
                    if (!token.matches("\\d+")) {
                        isValid = false;
                        break;
                    }
                    
                    try {
                        Integer.parseInt(token);
                    } catch (NumberFormatException e) {
                        // 解析エラーが発生した場合（上記 regex で除外されているはずだが念のため）
                        isValid = false;
                        break;
                    }
                }
            }
            
            if (isValid) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
