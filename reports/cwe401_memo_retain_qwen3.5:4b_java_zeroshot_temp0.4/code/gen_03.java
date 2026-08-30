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
        long total = 0;

        while ((line = reader.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line);
                int steps = calculateSteps(n);
                total += steps;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            }
        }

        System.out.println("total=" + total);
    }

    private static int calculateSteps(int n) {
        if (n == 1) {
            return 0;
        }
        long next = n % 2 == 0 ? n / 2 : 3L * n + 1;
        if (memo.containsKey(next)) {
            return memo.get(next);
        }
        int steps = 1 + calculateSteps((int) next);
        memo.put(next, steps);
        return steps;
    }
}
