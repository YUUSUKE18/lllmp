import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;

        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            try {
                long n = Long.parseLong(line);
                if (n == 1) {
                    total += 0;
                } else {
                    int steps = calculateSteps(n, memo);
                    total += steps;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("total=" + total);
    }

    private static int calculateSteps(long n, Map<Integer, Integer> memo) {
        if (n == 1) return 0;
        if (memo.containsKey((int) n)) {
            return memo.get((int) n);
        }

        int steps = 0;
        long nextN = n;

        while (nextN != 1) {
            if (nextN % 2 == 0) {
                nextN /= 2;
            } else {
                nextN = 3 * nextN + 1;
            }
            steps++;
        }

        memo.put((int) n, steps);
        return steps;
    }
}
