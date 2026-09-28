import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Integer> memo = new HashMap<>();
        long total = 0;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;

            try {
                int nLong = Integer.parseInt(line.trim());
                long n = nLong; // Cast to long for calculation
                total += getStepCount(n, memo);
            } catch (NumberFormatException e) {
            }
        }

        System.out.println("total=" + total);
    }

    private static int getStepCount(long n, Map<Long, Integer> memo) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long nextN;
        int steps;

        if (n % 2 == 0) {
            nextN = n / 2;
            steps = 1 + getStepCount(nextN, memo);
        } else {
            nextN = 3 * n + 1;
            steps = 1 + getStepCount(nextN, memo);
        }

        memo.put(n, steps);
        return steps;
    }
}
