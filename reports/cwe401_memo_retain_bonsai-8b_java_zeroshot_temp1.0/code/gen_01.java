import java.util.*;
import java.io.*;

public class Main {
    private static Map<Integer, Integer> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        Scanner scanner = new Scanner(System.in);
        int total = 0;
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            if (!isInteger(line)) continue;
            int n = Integer.parseInt(line);
            if (n == 1) {
                System.out.println("total=" + total);
                return;
            }
            int count = steps(n);
            total += count;
        }
        System.out.println("total=" + total);
    }

    private static int steps(int n) {
        if (memo.containsKey(n)) return memo.get(n);
        if (n == 1) return 0;
        int count = 1 + steps(n / 2);
        if (n % 2 == 0) {
            count = Math.min(count, steps(n / 2));
        } else {
            count = Math.min(count, steps(3 * n + 1));
        }
        memo.put(n, count);
        return count;
    }
}
