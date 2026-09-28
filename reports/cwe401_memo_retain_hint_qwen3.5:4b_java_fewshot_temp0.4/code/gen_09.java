import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Integer> memo = new HashMap<>();
        memo.put(1L, 0);
        long total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                long n = Long.parseLong(line);
                int steps = getSteps(n, memo);
                total += steps;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + total);
    }
    
    private static int getSteps(long n, Map<Long, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int steps;
        if (n % 2 == 0) {
            steps = 1 + getSteps(n / 2, memo);
        } else {
            steps = 1 + getSteps(3 * n + 1, memo);
        }
        
        memo.put(n, steps);
        return steps;
    }
}
