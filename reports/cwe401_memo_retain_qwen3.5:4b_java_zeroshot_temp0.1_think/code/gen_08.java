import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static Map<Long, Long> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        // Base case: steps to reach 1 from 1 is 0
        memo.put(1L, 0L);

        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            try {
                long n = Long.parseLong(line);
                total += getSteps(n);
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be interpreted as integers
            }
        }
        System.out.println("total=" + total);
    }

    private static long getSteps(long n) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);

        long nextVal;
        if (n % 2 == 0) {
            nextVal = n / 2;
        } else {
            nextVal = 3 * n + 1;
        }

        long stepsFromNext = getSteps(nextVal);
        memo.put(n, stepsFromNext + 1);
        return stepsFromNext + 1;
    }
}
