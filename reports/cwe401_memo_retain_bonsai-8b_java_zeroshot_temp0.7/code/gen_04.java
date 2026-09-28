import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    private static final int MAX = 1000000000;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long total = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (n < 1) continue;
                total += compute(n);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("total=" + total);
    }

    private static int compute(int n) {
        if (memo.containsKey(n)) return memo.get(n);
        if (n == 1) return 0;

        int steps = 0;
        int current = n;
        while (current != 1) {
            if (current % 2 == 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        memo.put(n, steps);
        return steps;
    }
}
