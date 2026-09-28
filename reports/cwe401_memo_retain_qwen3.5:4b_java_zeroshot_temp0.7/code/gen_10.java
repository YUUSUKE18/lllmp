import java.util.Scanner;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Map<Long, Integer> memo = new HashMap<>();
        long totalSteps = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) {
                continue;
            }
            try {
                int n = Integer.parseInt(line);
                
                if (n == 1) {
                    totalSteps += 0;
                } else {
                    long steps = calculateCollatz(n, memo);
                    totalSteps += steps;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + totalSteps);
    }

    private static int calculateCollatz(long n, Map<Long, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

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
