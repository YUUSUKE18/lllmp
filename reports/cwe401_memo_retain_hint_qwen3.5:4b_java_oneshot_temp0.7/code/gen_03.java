import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Long> memo = new HashMap<>();
        long total = 0;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            
            try {
                long n = Long.parseLong(line.trim());
                
                if (n == 1) {
                    total += 0;
                    memo.put(n, 0L);
                } else {
                    long steps = getSteps(n, memo);
                    total += steps;
                    memo.put(n, steps);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }

    private static long getSteps(long n, Map<Long, Long> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        long steps;
        if (n % 2 == 0) {
            steps = 1 + getSteps(n / 2, memo);
        } else {
            steps = 1 + getSteps(3L * n + 1, memo);
        }
        
        memo.put(n, steps);
        return steps;
    }
}
