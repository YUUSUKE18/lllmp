import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.Map;
import java.util.HashMap;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Integer> memo = new HashMap<>();
        int totalSteps = 0;

        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            try {
                long n = Long.parseLong(line);
                if (!memo.containsKey(n)) {
                    int steps = calculateSteps(n, memo);
                    memo.put(n, steps);
                    totalSteps += steps;
                } else {
                    totalSteps += memo.get(n);
                }
            } catch (NumberFormatException e) {
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static int calculateSteps(long n, Map<Long, Integer> memo) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);

        long nextN = (n % 2 == 0) ? (n / 2) : (3 * n + 1);
        int steps = 1 + calculateSteps(nextN, memo);
        memo.put(n, steps);
        return steps;
    }
}
