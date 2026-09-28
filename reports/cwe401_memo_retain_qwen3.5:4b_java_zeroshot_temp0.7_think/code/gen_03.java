import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {
    private static final Map<Long, Integer> memo = new HashMap<>();

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long totalSteps = 0;

        while (sc.hasNext()) {
            if (sc.hasNextLong()) {
                long n = sc.nextLong();
                totalSteps += getSteps(n);
            } else {
                // Ignore lines/tokens that are not integers
                sc.next();
            }
        }
        System.out.println("total=" + totalSteps);
    }

    private static int getSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long next = n % 2 == 0 ? n / 2 : 3 * n + 1;
        int steps = 1 + getSteps(next);
        memo.put(n, steps);
        return steps;
    }
}
