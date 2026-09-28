import java.util.*;

public class Main {
    private static Map<Integer, Integer> memo = new HashMap<>();

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long total = 0;
        while (scanner.hasNext()) {
            try {
                int n = Integer.parseInt(scanner.nextLine());
                if (n == 1) {
                    System.out.println("total=0");
                    continue;
                }
                if (memo.containsKey(n)) {
                    System.out.println("total=" + memo.get(n));
                    continue;
                }
                int steps = steps(n);
                memo.put(n, steps);
                total += steps;
            } catch (NumberFormatException e) {
                // 空行を無視し、非整数行も無視
            }
        }
        System.out.println("total=" + total);
    }

    private static int steps(int n) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        int steps = 0;
        if (n % 2 == 0) {
            n /= 2;
        } else {
            n = 3 * n + 1;
        }
        steps = 1 + steps(n);
        memo.put(n, steps);
        return steps;
    }
}
