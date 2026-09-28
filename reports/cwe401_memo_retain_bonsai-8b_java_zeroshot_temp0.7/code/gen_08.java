import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    private static final long MAX_ITERATIONS = 1000000000L;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long total = 0;
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (n == 1) {
                    System.out.println("total=" + total);
                    return;
                }
                int current = n;
                int steps = 0;
                boolean seen = false;
                while (!current.equals(1) && !seen) {
                    if (memo.containsKey(current)) {
                        steps += memo.get(current);
                        seen = true;
                    } else {
                        seen = false;
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        steps++;
                        memo.put(current, steps);
                    }
                }
                total += steps;
            } catch (NumberFormatException e) {
                // Ignore invalid lines
            }
        }
        System.out.println("total=" + total);
    }
}
