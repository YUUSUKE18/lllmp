import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static Map<Long, Long> memo = new HashMap<>();

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
        String line;

        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            try {
                long n = Long.parseLong(line);
                long steps = calculateCollatz(n);
                totalSteps += steps;
            } catch (NumberFormatException e) {
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static long calculateCollatz(long n) {
        if (n == 1) return 0;
        
        Long cached = memo.get(n);
        if (cached != null) return cached;

        long steps;
        if (n % 2 == 0) {
            steps = 1 + calculateCollatz(n / 2);
        } else {
            steps = 1 + calculateCollatz(3L * n + 1);
        }

        memo.put(n, steps);
        return steps;
    }
}
