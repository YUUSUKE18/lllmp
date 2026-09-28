import java.util.*;

public class Main {
    private static Map<Integer, Integer> memo = new HashMap<>();
    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        int total = 0;
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (n == 1) {
                    System.out.println("total=" + total);
                    return;
                }
                int count = 0;
                int current = n;
                while (current != 1) {
                    count++;
                    current = (current % 2 == 0) ? current / 2 : 3 * current + 1;
                }
                System.out.println("total=" + total);
                total += count;
            } catch (NumberFormatException e) {
                // Ignore non-integer lines
            }
        }
        System.out.println("total=" + total);
    }

    public static int steps(int n) {
        if (memo.containsKey(n)) return memo.get(n);
        if (n == 1) return 0;
        int steps = steps(n / 2) + 1;
        if (n % 2 == 1) {
            steps = Math.min(steps, steps(3 * n + 1));
        }
        memo.put(n, steps);
        return steps;
    }
}
