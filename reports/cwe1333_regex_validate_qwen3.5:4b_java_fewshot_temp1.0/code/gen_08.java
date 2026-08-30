import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            // 行の前後の空白を切り落とし、空行の場合は無視
            if (line.trim().isEmpty()) continue;
            
            String trimmed = line.trim();
            StringTokenizer st = new StringTokenizer(trimmed);
            
            boolean valid = true;
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                try {
                    Integer.parseInt(token);
                } catch (NumberFormatException e) {
                    valid = false;
                    break;
                }
            }
            
            // トークン自体が空文字列である場合（例：「1, ,2」）を判定する必要があるか？
            // 「カンマで区切られる整数列」と定義され、末尾のカンマは許容されるとある。
            // StringTokenizer は空文字列のトークンを発生させないため、「1,,2」の場合 
            // 「1」と「,」が別々のトークンになり、「,」は Integer.parseInt で异常になる。
            // ただし、「1,2,」の場合は「1」と「2」のみを返す。
            
            if (!valid) {
                System.out.print(".");
            } else {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
