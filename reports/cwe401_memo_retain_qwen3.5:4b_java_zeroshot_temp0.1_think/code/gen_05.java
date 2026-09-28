import java.util.Scanner;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

public class Main {
    private static Map<Long, Integer> memo = new HashMap<>();

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        memo.put(1L, 0);
        long totalSum = 0;
        
        while (sc.hasNext()) {
            String token = sc.next();
            try {
                long n = Long.parseLong(token);
                totalSum += solve(n);
            } catch (NumberFormatException e) {
                // Ignore non-integer tokens
            }
        }
        
        System.out.println("total=" + totalSum);
    }

    private static int solve(long n) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long curr = n;
        List<Long> path = new ArrayList<>();
        
        while (curr != 1 && !memo.containsKey(curr)) {
            path.add(curr);
            if (curr % 2 == 0) {
                curr /= 2;
            } else {
                curr = 3 * curr + 1;
            }
        }

        int endSteps = (curr == 1) ? 0 : memo.get(curr);
        
        // Fill memo for path nodes backwards
        int currentStepsFromEnd = endSteps;
        for (int i = path.size() - 1; i >= 0; i--) {
            long node = path.get(i);
            currentStepsFromEnd++;
            memo.put(node, currentStepsFromEnd);
        }

        return memo.get(n);
    }
}
