import java.util.Scanner;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Map<Long, Integer> memo = new HashMap<>();
        int totalSteps = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) {
                continue;
            }
            try {
                long n = Long.parseLong(line);
                totalSteps += solve(n, memo);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static int solve(long n, Map<Long, Integer> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        int steps;
        long nextN;

        if (n % 2 == 0) {
            nextN = n / 2;
            steps = 1 + solve(nextN, memo);
        } else {
            nextN = 3L * n + 1;
            steps = 1 + solve(nextN, memo);
        }

        memo.put(n, steps);
        return steps;
    }
}
