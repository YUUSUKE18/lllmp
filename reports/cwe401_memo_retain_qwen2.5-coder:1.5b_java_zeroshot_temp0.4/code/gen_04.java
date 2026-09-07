import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        for (String line : System.in.lines().filter(line -> !line.isEmpty())) {
            int n = Integer.parseInt(line);
            if (n == 1) {
                total += 0;
            } else {
                total += memo.computeIfAbsent(n, k -> computeSteps(k, memo));
            }
        }
        System.out.println("total=" + total);
    }

    private static int computeSteps(int n, Map<Integer, Integer> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        int steps = 0;
        if (n % 2 == 0) {
            steps += computeSteps(n / 2, memo);
        } else {
            steps += computeSteps(3 * n + 1, memo);
        }
        memo.put(n, steps + 1);
        return steps + 1;
    }
}
