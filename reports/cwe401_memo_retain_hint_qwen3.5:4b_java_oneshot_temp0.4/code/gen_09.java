import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                long n = Long.parseLong(line);
                
                if (n == 1) {
                    total += memo.getOrDefault(1, 0);
                } else {
                    int steps = calculateSteps(n, memo);
                    total += steps;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + total);
    }
    
    private static int calculateSteps(long n, Map<Integer, Integer> memo) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        
        int steps = 0;
        long nextVal;
        
        if (n % 2 == 0) {
            nextVal = n / 2;
        } else {
            nextVal = 3 * n + 1;
        }
        
        steps += calculateSteps(nextVal, memo);
        memo.put((int)n, steps);
        return steps;
    }
}
