import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    private static final long MAX_ITERATIONS = 1000000;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long total = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty() || !isInteger(line)) {
                continue;
            }

            int n = Integer.parseInt(line);
            if (memo.containsKey(n)) {
                total += memo.get(n);
                continue;
            }

            int count = 0;
            int current = n;

            while (current != 1 && count < MAX_ITERATIONS) {
                count++;
                if (current % 2 == 0) {
                    current /= 2;
                } else {
                    current = 3 * current + 1;
                }
                if (current > 2147483647) {
                    System.out.println("total=" + total);
                    return;
                }
            }

            if (current == 1) {
                total += count;
            } else {
                System.out.println("total=" + total);
            }

            memo.put(n, count);
        }

        System.out.println("total=" + total);
    }

    private static boolean isInteger(String s) {
        try {
            Integer.parseInt(s);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
