import java.util.Scanner;
import java.util.Map;
import java.util.HashMap;

public class Main {
    private static final Map<Long, Integer> memo = new HashMap<>();

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long totalSteps = 0;

        while (sc.hasNext()) {
            if (!sc.hasNextLong()) {
                sc.next(); // Skip non-integer token
                continue;
            }
            long n = sc.nextLong();
            totalSteps += solve(n);
        }
        
        System.out.println("total=" + totalSteps);
    }

    private static int solve(long n) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        
        long next = (n % 2 == 0) ? n / 2 : 3 * n + 1;
        int steps = 1 + solve(next);
        memo.put(n, steps);
        return steps;
    }
}
