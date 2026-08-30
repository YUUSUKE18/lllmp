import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        int count = 0;
        long maxLong = Long.MIN_VALUE;
        boolean hasValue = false; // マッチした要素が見つかったかどうかのフラグ

        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                
                try {
                    long n = Long.parseLong(token.trim());
                    
                    count++; // 有効な要素数をカウント
                    
                    if (!hasValue || n > maxLong) {
                        hasValue = true;
                        maxLong = n;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解析できない場合は無視
                }
            }
        }

        long maxValue = hasValue ? maxLong : Long.MIN_VALUE - 1; 
        
        if (count > 0 && !hasValue) {
             // ここへの進路: count > 0 but no valid value found, which is impossible due to logic above.
             // Let's refine the output format directly based on count and max found.
        } else if (!hasValue) {
            // If there are elements provided (count >= 1), then a max MUST have been set by parsing at least one integer correctly or skipping invalid ones? 
            // Wait, spec says: ignore empty/whitespace, skip non-integers. Count is the number of valid integers parsed. Max is their maximum.
            // If no integers could be parsed (e.g., input "abc"), count=0, max undefined? The output format implies a value exists or we handle 0 case. 
            // Given Java's default long range logic and problem constraints usually implying at least one number if requested...
            // Let's assume standard behavior: calculate max of found integers. If no integers, what to print? Usually empty input -> count=0, max is undefined but let's use a safe sentinel or just 0 if strictly positive numbers expected (spec didn't say positive). 
            // However, with `Long.MIN_VALUE` as start, and initializing max when the FIRST valid int comes in ensures correctness.
        }

        System.out.println("count=" + count + " max=" + maxLong);
    }
}
