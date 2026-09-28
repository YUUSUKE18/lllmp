import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    private static final int MAX_VAL = 6100000007L; // 64bit max value

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int total = 0;

        while (true) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(line.trim());
                if (n == 1) {
                    total += 0;
                } else {
                    int steps = solve(n, memo);
                    total += steps;
                }
            } catch (NumberFormatException e) {
                // インテルパレスible インプut
                continue;
            }
        }

        System.out.println("total=" + total);
    }

    private static int solve(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) return memo.get(n);

        int result = 0;
        int current = n;

        // 64bit intで安全に対応
        while (current != 1) {
            if (current % 2 == 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
                if (current > MAX_VAL) break;
            }
            result++;
            // 64bit intでは3n+1が大きな可能性があるため、安全に制限する
            if (current > MAX_VAL) break;
        }

        memo.put(n, result);
        return result;
    }
}
