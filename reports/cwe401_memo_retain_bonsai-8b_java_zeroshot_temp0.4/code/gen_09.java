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
                    System.out.println("total=0");
                    continue;
                }
                int steps = steps(n);
                total += steps;
            } catch (NumberFormatException e) {
                // Ignore invalid lines
            }
        }
        System.out.println("total=" + total);
    }

    private static int steps(int n) {
        if (memo.containsKey(n)) return memo.get(n);
        int steps = 0;
        while (n != 1) {
            if (n % 2 == 0) n /= 2;
            else n = 3 * n + 1;
            steps++;
        }
        memo.put(n, steps);
        return steps;
    }
}
