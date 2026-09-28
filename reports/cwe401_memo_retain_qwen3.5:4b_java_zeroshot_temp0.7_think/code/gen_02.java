import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static final Map<Long, Long> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        long totalSteps = 0;
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line;
        while ((line = br.readLine()) != null) {
            if (line == null || line.trim().isEmpty()) continue; 
            
            try {
                long n = Long.parseLong(line.trim());
                
                // 1 以上の整数として処理
                if (n < 1) continue; 
                
                totalSteps += getSteps(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + totalSteps);
    }

    private static long getSteps(long n) {
        if (n == 1L) return 0;
        if (memo.containsKey(n)) return memo.get(n);

        long nextVal = (n % 2 == 0) ? (n / 2) : (3 * n + 1);
        
        // 再帰的に計算し、結果をメモ化
        long steps = getSteps(nextVal);
        
        memo.put(n, steps + 1);
        return steps + 1;
    }
}
