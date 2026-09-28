import java.util.*;
import java.io.*;

public class Main {
    private static Map<Long, Long> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
            String line;
            long totalSteps = 0;

            while ((line = br.readLine()) != null) {
                line = line.trim();
                if (line.isEmpty()) {
                    continue;
                }

                try {
                    long n = Long.parseLong(line);
                    totalSteps += calculateCollatz(n);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視する
                }
            }

            System.out.println("total=" + totalSteps);
        }
    }

    private static long calculateCollatz(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long next = (n % 2 == 0) ? n / 2 : 3 * n + 1;
        long steps = 1 + calculateCollatz(next);
        memo.put(n, steps);
        return steps;
    }
}
