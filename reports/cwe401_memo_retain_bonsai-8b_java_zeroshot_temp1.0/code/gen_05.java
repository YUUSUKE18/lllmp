import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        int total = 0;
        while (scanner.hasNext()) {
            try {
                int n = Integer.parseInt(scanner.nextLine());
                if (n <= 0) continue;
                total += getSteps(n);
            } catch (NumberFormatException e) {
                // 空行または非整数行を無視
            }
        }
        System.out.println("total=" + total);
    }

    private static int getSteps(int n) {
        if (memo.containsKey(n)) return memo.get(n);
        if (n == 1) return 0;
        int steps = getSteps(n / 2) + 1;
        if (n % 2 == 1) {
            steps += getSteps(3 * n + 1) + 1;
        }
        memo.put(n, steps);
        return steps;
    }
}
