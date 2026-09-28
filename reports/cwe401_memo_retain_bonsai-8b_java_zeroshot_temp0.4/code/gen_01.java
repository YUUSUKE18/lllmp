import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    private static final Scanner scanner = new Scanner(System.in);

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
                int count = steps(n);
                total += count;
            } catch (NumberFormatException e) {
                // Ignore non-integer lines
            }
        }
        System.out.println("total=" + total);
    }

    private static int steps(int n) {
        if (memo.containsKey(n)) return memo.get(n);
        if (n == 1) {
            memo.put(n, 0);
            return 0;
        }
        int count = 1 + steps(n / 2);
        if (n % 2 == 1) {
            count = 1 + steps(3 * n + 1);
        }
        memo.put(n, count);
        return count;
    }
}
