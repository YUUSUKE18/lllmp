import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    private static final int MAX_N = 1000000000;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int total = 0;

        while (true) {
            try {
                String line = scanner.nextLine();
                if (line.trim().isEmpty()) {
                    continue;
                }
                int n = Integer.parseInt(line.trim());
                if (n < 1) {
                    continue;
                }

                int steps = computeSteps(n);
                total += steps;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("total=" + total);
    }

    public static int computeSteps(int n) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        if (n == 1) {
            memo.put(1, 0);
            return 0;
        }

        if (n % 2 == 0) {
            int result = computeSteps(n / 2);
        } else {
            int result = computeSteps(3 * n + 1);
        }

        memo.put(n, result + 1);
        return result + 1;
    }
}
