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
        long totalSteps = 0;

        while ((line = reader.readLine()) != null) {
            try {
                int n = Integer.parseInt(line.trim());
                if (n < 1) continue;
                totalSteps += calculateSteps(n);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static int calculateSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        int steps;
        if (n % 2 == 0) {
            steps = 1 + calculateSteps(n / 2);
        } else {
            steps = 1 + calculateSteps(3L * n + 1);
        }

        memo.put(n, steps);
        return steps;
    }
}
