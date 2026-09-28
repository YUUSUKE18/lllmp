import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> queries = new ArrayList<>();

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (!line.isEmpty()) {
                try {
                    int n = Integer.parseInt(line);
                    if (n >= 1) {
                        queries.add(n);
                    }
                } catch (NumberFormatException e) {
                    // Ignore invalid integers
                }
            }
        }

        int total = 0;
        for (int n : queries) {
            total += getSteps(n);
        }

        System.out.println("total=" + total);
    }

    private static int getSteps(int n) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        if (n == 1) {
            int steps = 0;
        } else if (n % 2 == 0) {
            int steps = 1 + getSteps(n / 2);
        } else {
            int steps = 1 + getSteps(3 * n + 1);
        }

        memo.put(n, steps);
        return steps;
    }
}
