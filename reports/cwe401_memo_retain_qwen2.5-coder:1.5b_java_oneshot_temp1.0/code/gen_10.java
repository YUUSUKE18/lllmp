import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
            String line;
            while ((line = br.readLine()) != null && !line.isEmpty()) {
                int n = Integer.parseInt(line.trim());
                int steps = memo.computeIfAbsent(n, i -> computeSteps(i, memo));
                total += steps;
            }
        }
        System.out.println("total=" + total);
    }

    private static int computeSteps(int n, Map<Integer, Integer> memo) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        if (n % 2 == 0) return 1 + computeSteps(n / 2, memo);
        return 1 + computeSteps(3 * n + 1, memo);
    }
}
