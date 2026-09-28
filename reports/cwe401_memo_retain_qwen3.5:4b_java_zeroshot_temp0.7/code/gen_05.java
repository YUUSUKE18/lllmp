import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static Map<Long, Integer> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line;
        
        long totalSteps = 0;
        
        while ((line = reader.readLine()) != null) {
            try {
                long n = Long.parseLong(line.trim());
                
                if (n == 1) {
                    continue;
                }
                
                int steps = calculateSteps(n);
                totalSteps += steps;
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + totalSteps);
    }

    private static int calculateSteps(long n) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int steps = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n /= 2;
            } else {
                n = 3 * n + 1;
            }
            steps++;
        }
        
        memo.put(n, steps);
        return steps;
    }
}
