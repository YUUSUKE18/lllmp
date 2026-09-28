import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static final Map<Long, Long> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        long total = 0;

        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            try {
                long n = Long.parseLong(line);
                total += getSteps(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            }
        }

        System.out.println("total=" + total);
    }

    private static long getSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long next = (n % 2 == 0) ? n / 2 : 3 * n + 1;
        long steps = getSteps(next) + 1;
        memo.put(n, steps);
        return steps;
    }
}
