import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static Map<Long, Long> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;

        String line;
        while ((line = reader.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            
            try {
                long n = Long.parseLong(line);
                totalSteps += calculateSteps(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static long calculateSteps(long n) {
        if (n == 1) {
            return 0;
        }
        
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long steps;
        if (n % 2 == 0) {
            steps = calculateSteps(n / 2) + 1;
        } else {
            steps = calculateSteps(3L * n + 1) + 1;
        }

        memo.put(n, steps);
        return steps;
    }
}
