import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int total = 0;
        Map<Integer, Integer> memo = new HashMap<>();

        while (scanner.hasNextInt()) {
            int n = scanner.nextInt();
            if (memo.containsKey(n)) {
                total += memo.get(n);
            } else {
                int steps = getSteps(n, memo);
                total += steps;
                memo.put(n, steps);
            }
        }

        System.out.println("total=" + total);
    }

    private static int getSteps(int n, Map<Integer, Integer> memo) {
        if (n == 1) {
            return 0;
        } else if (n % 2 == 0) {
            return 1 + getSteps(n / 2, memo);
        } else {
            return 1 + getSteps(3 * n + 1, memo);
        }
    }
}
