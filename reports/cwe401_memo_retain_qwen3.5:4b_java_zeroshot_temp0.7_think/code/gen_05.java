import java.util.Scanner;
import java.util.Map;
import java.util.HashMap;

public class Main {
    private static final Map<Long, Long> memo = new HashMap<>();

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long totalSteps = 0;

        while (sc.hasNext()) {
            String token = sc.next();
            try {
                long n = Long.parseLong(token);
                totalSteps += calculate(n);
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be interpreted as integers
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static long calculate(long n) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long nextN;
        if (n % 2 == 0) {
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }

        long steps = calculate(nextN);
        memo.put(n, steps + 1);
        return steps + 1;
    }
}
