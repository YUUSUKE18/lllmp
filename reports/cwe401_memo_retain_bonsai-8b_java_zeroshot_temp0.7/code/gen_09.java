import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long total = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (n == 1) {
                    System.out.println("total=0");
                    continue;
                }
                int steps = steps(n);
                total += steps;
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

        int steps = 0;
        int current = n;
        boolean even = false;

        while (current != 1) {
            if (current % 2 == 0) {
                even = true;
                current /= 2;
            } else {
                current = 3 * current + 1;
            }

            steps++;
        }

        if (even) {
            memo.put(n, steps / 2);
        } else {
            memo.put(n, steps);
        }

        return steps;
    }
}
