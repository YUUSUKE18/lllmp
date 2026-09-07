import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int total = 0;
        Map<Integer, Integer> memo = new HashMap<>();

        while (true) {
            String query = sc.nextLine();
            if (query.isEmpty()) {
                break;
            }

            int n = Integer.parseInt(query);

            if (memo.containsKey(n)) {
                total += memo.get(n);
            } else {
                int steps = calculateSteps(n, memo);
                total += steps;
                memo.put(n, steps);
            }
        }

        System.out.println("total=" + total);
    }

    private static int calculateSteps(int n, Map<Integer, Integer> memo) {
        if (n == 1) {
            return 0;
        }

        if (n % 2 == 0) {
            return 1 + calculateSteps(n / 2, memo);
        } else {
            return 1 + calculateSteps(3 * n + 1, memo);
        }
    }
}
