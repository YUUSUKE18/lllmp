import java.util.*;

public class Main {
    private static Map<Integer, Integer> memo = new HashMap<>();

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (n <= 0) continue;
                numbers.add(n);
            } catch (NumberFormatException e) {
                // Ignore non-integer lines
            }
        }

        int total = 0;
        for (int n : numbers) {
            total += getSteps(n);
        }

        System.out.println("total=" + total);
    }

    private static int getSteps(int n) {
        if (memo.containsKey(n)) return memo.get(n);
        if (n == 1) return 0;

        int steps = 1 + getSteps(n / 2);
        if (n % 2 != 0) {
            steps = Math.max(steps, 1 + getSteps(3 * n + 1));
        }

        memo.put(n, steps);
        return steps;
    }
}
