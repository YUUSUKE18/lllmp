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
                int n = Integer.parseInt(line);
                long current = n;
                int steps = 0;
                
                while (current != 1) {
                    if (memo.containsKey(current)) {
                        steps += memo.get(current);
                        break;
                    }
                    
                    long nextVal;
                    if (current % 2 == 0) {
                        nextVal = current / 2;
                    } else {
                        nextVal = 3 * current + 1;
                    }
                    
                    if (!memo.containsKey(nextVal)) {
                        memo.put(nextVal, 0);
                    }
                    
                    int subSteps = calculateSteps(nextVal, memo);
                    steps += subSteps;
                    current = nextVal;
                }
                
                total += steps;
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + total);
    }
    
    private static int calculateSteps(long n, Map<Long, Integer> memo) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        
        long nextVal;
        if (n % 2 == 0) {
            nextVal = n / 2;
        } else {
            nextVal = 3 * n + 1;
        }
        
        int steps = 1 + calculateSteps(nextVal, memo);
        memo.put(n, steps);
        return steps;
    }
}
