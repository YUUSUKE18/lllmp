import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Long> memo = new HashMap<>();
        memo.put(1L, 0L);
        long total = 0;
        
        while (true) {
            String line = br.readLine();
            if (line == null) break;
            
            int n = -1;
            try {
                n = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                continue;
            }
            
            long steps = calculateSteps(n, memo);
            total += steps;
        }
        
        System.out.println("total=" + total);
    }
    
    private static long calculateSteps(int n, Map<Long, Long> memo) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        
        long stepsFromN = 0;
        int nextN;
        if (n % 2 == 0) {
            nextN = n / 2;
            stepsFromN += calculateSteps(nextN, memo);
        } else {
            nextN = 3L * n + 1;
            stepsFromN += calculateSteps(nextN, memo);
        }
        
        return memo.put((long)n, stepsFromN);
    }
}
