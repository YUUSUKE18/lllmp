import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        int total = 0;
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (n == 1) {
                    System.out.println("total=0");
                    continue;
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
        if (n == 1) return 0;
        if (n % 2 == 0) n /= 2;
        else n = 3 * n + 1;
        int count = 1 + steps(n);
        memo.put(n, count);
        return count;
    }
}
