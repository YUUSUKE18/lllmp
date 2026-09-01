import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static final Map<Long, Integer> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder totalSum = new StringBuilder();
        
        String line;
        while ((line = reader.readLine()) != null) {
            try {
                int n = Integer.parseInt(line.trim());
                if (n <= 0) continue;
                
                int steps = collatzSteps(n);
                totalSum.append(steps).append("\n");
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + totalSum.toString().trim());
    }

    private static int collatzSteps(long n) {
        if (n == 1) return 0;
        
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int steps;
        if (n % 2 == 0) {
            steps = 1 + collatzSteps(n / 2);
        } else {
            steps = 1 + collatzSteps(3 * n + 1);
        }
        
        memo.put(n, steps);
        return steps;
    }
}
