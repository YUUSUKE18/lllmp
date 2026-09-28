import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Long> memo = new HashMap<>();
        memo.put(1L, 0L);
        long total = 0L;
        
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line.trim());
                long steps = calculateSteps(n, memo);
                total += steps;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + total);
    }
    
    private static long calculateSteps(long n, Map<Long, Long> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        long steps = 0;
        if (n % 2 == 0) {
            steps += 1 + calculateSteps(n / 2, memo);
        } else {
            steps += 1 + calculateSteps(3L * n + 1, memo);
        }
        
        memo.put(n, steps);
        return steps;
    }
}
