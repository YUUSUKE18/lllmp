import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        // 空行や空白のみの場合的处理
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max="); 
            return;
        }

        StringTokenizer st = new StringTokenizer(line);
        long count = 0;
        long maxValue = Long.MIN_VALUE - 1; // より小さい初期値
        
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            
            try {
                long value = Long.parseLong(token.trim());
                
                if (!Long.isFinite(value)) continue; // NaN や無限大の場合
                
                count++;
                
                if (value > maxValue) {
                    maxValue = value;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        System.out.println("count=" + count + " max=" + maxValue);
    }
}
