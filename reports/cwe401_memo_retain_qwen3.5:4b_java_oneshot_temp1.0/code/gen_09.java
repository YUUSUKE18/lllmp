import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Map;
import java.util.HashMap;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Long> memo = new HashMap<>();
        memo.put(1L, 0L);
        long total = 0L;
        
        String line;
        while ((line = br.readLine()) != null) {
            try {
                line = line.trim();
                if (line.isEmpty()) continue;
                long n = Long.parseLong(line);
                total += solve(n, memo);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + total);
    }
    
    private static long solve(long n, Map<Long, Long> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        long steps;
        if (n % 2 == 0) {
            steps = 1 + solve(n / 2, memo);
        } else {
            steps = 1 + solve(3L * n + 1, memo);
        }
        
        memo.put(n, steps);
        return steps;
    }
}
