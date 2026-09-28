import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        int total = 0;
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (n < 1) continue;
                int steps = steps(n);
                total += steps;
            } catch (NumberFormatException e) {
                // Ignore non-integer lines
            }
        }
        System.out.println("total=" + total);
    }

    private static int steps(int n) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        int count = 0;
        while (n != 1) {
            count++;
            if (n % 2 == 0) n /= 2;
            else n = 3 * n + 1;
        }
        memo.put(n, count);
        return count;
    }
}
