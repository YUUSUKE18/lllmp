import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static final Map<Long, Integer> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line;
        long totalSum = 0;

        while ((line = reader.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            try {
                long n = Long.parseLong(line);
                totalSum += getSteps(n);
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be interpreted as integers
            }
        }

        System.out.println("total=" + totalSum);
    }

    private static int getSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long nextN;
        if ((n & 1) == 0) {
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }

        int steps = getSteps(nextN);
        memo.put(n, steps + 1);
        return steps + 1;
    }
}
