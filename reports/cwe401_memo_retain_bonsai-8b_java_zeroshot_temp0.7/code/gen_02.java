import java.util.*;

public class Main {
    private static Map<Integer, Integer> memo = new HashMap<>();

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (!line.isEmpty() && Integer.parseInt(line) != 0) {
                numbers.add(Integer.parseInt(line));
            }
        }

        int total = 0;
        for (int n : numbers) {
            total += calculateSteps(n);
        }

        System.out.println("total=" + total);
    }

    private static int calculateSteps(int n) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        if (n == 1) {
            memo.put(n, 0);
            return 0;
        }

        int steps = 1 + calculateSteps(n / 2);
        if (n % 2 != 0) {
            steps = Math.min(steps, 1 + calculateSteps(3 * n + 1));
        }
        memo.put(n, steps);
        return steps;
    }
}
