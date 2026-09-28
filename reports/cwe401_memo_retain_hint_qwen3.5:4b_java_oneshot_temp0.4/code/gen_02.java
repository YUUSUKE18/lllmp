import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int totalSteps = 0;

        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            try {
                long n = Long.parseLong(line);
                if (n == 1) {
                    totalSteps += 0;
                    continue;
                }

                int stepsForN = getCollatzSteps(n, memo);
                totalSteps += stepsForN;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static int getCollatzSteps(long n, Map<Integer, Integer> memo) {
        if (memo.containsKey((int) n)) {
            return memo.get((int) n);
        }

        int steps = 0;
        while (n > 1) {
            if (n % 2 == 0) {
                n /= 2;
            } else {
                n = 3 * n + 1;
            }
            steps++;
        }

        memo.put((int) n, steps);
        return steps;
    }
}
