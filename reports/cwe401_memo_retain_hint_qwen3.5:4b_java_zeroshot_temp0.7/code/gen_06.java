import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Integer> memo = new HashMap<>();
        memo.put(1L, 0);
        
        long totalSteps = 0;
        String line;
        
        while ((line = reader.readLine()) != null) {
            try {
                long n = Long.parseLong(line.trim());
                if (n > 0 && n % 2 == 0) {
                    n /= 2;
                } else {
                    n = 3L * n + 1;
                }
                
                totalSteps += memo.getOrDefault(n, calculateCollatzStep(memo, n));
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + totalSteps);
    }
    
    private static Integer calculateCollatzStep(Map<Long, Integer> memo, long n) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int steps = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n /= 2;
            } else {
                n = 3L * n + 1;
            }
            steps++;
        }
        
        memo.put(n, steps);
        return steps;
    }
}
