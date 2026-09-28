import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static final Map<Long, Integer> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;

        String line;
        while ((line = br.readLine()) != null) {
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
        if (memo.containsKey((long) n)) {
            return memo.get((long) n);
        }

        int steps;
        if (n % 2 == 0) {
            steps = 1 + calculateSteps(n / 2);
        } else {
            steps = 1 + calculateSteps(3L * n + 1);
        }

        memo.put((long) n, steps);
        return steps;
    }
}
