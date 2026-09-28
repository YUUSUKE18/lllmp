import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    private static final int MAX_N = 2**31; // 64bit 整数の範囲内

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> queries = new ArrayList<>();
        while (true) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (n < 1) continue;
                queries.add(n);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        int total = 0;
        for (int n : queries) {
            total += computeSteps(n);
        }

        System.out.println("total=" + total);
    }

    private static int computeSteps(int n) {
        if (memo.containsKey(n)) return memo.get(n);
        int steps = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                n = 3 * n + 1;
            }
            steps++;
        }
        memo.put(n, steps);
        return steps;
    }
}
