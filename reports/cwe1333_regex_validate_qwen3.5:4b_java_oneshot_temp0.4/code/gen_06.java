import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            String trimmed = line.trim();
            if (trimmed.isEmpty()) {
                continue;
            }
            
            // 空白区切りで分割し、要素をカンマで結合して再チェックするのではなく、
            // 直接カンマ区切りの形式として解析する。
            // 仕様: "1 個以上の数字列がカンマで区切られて並んでいる"
            // 末尾のカンマは許容
            
            StringTokenizer st = new StringTokenizer(trimmed);
            StringBuilder sb = new StringBuilder();
            
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                if (!token.matches("-?[0-9]+")) {
                    break; // 数字でない要素が含まれているため不成立
                }
                if (sb.length() > 0) {
                    sb.append(",");
                }
                sb.append(token);
            }
            
            String reconstructed = sb.toString();
            
            // 再構築された文字列が空ではないか確認（1 個以上の数字が必要）
            if (!reconstructed.isEmpty()) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
