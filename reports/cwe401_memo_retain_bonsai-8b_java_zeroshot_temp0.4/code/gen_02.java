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
                // Ignore lines that cannot be parsed as integers
            }
        }
        System.out.println("total=" + total);
    }

    private static int steps(int n) {
        if (memo.containsKey(n)) return memo.get(n);
        if (n == 1) return 0;
        int steps = 0;
        int next = n % 2 == 0 ? n / 2 : 3 * n + 1;
        while (next != 1) {
            steps++;
            int temp = next;
            next = temp % 2 == 0 ? temp / 2 : 3 * temp + 1;
        }
        memo.put(n, steps);
        return steps;
    }
}
