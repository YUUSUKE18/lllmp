import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static final Map<Long, Integer> cache = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;

        while (true) {
            String line = br.readLine();
            if (line == null) break;
            
            line = line.trim();
            if (line.isEmpty()) continue;

            try {
                long n = Long.parseLong(line);
                totalSteps += countCollatz(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static int countCollatz(long n) {
        if (n == 1) return 0;
        
        Integer cached = cache.get(n);
        if (cached != null) return cached;

        long nextVal;
        boolean isEven;
        if ((isEven = (n & 1) == 0)) {
            nextVal = n / 2;
        } else {
            nextVal = 3 * n + 1;
        }

        int steps;
        if (nextVal == 1) {
            steps = 1;
        } else {
            steps = 1 + countCollatz(nextVal);
        }

        cache.put(n, steps);
        return steps;
    }
}
