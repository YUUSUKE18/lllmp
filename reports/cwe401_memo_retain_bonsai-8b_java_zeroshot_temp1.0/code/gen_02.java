import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (memo.containsKey(n)) {
                    total += memo.get(n);
                    continue;
                }
                int steps = stepsToOne(n, memo);
                total += steps;
                memo.put(n, steps);
            } catch (NumberFormatException e) {
                // 忽略
            }
        }
        
        System.out.println("total=" + total);
    }
    
    private static int stepsToOne(int n, Map<Integer, Integer> memo) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        
        int steps = stepsToOne(n / 2, memo);
        if (n % 2 == 0) {
            steps += 1;
        } else {
            steps += stepsToOne((3 * n) + 1, memo);
        }
        
        memo.put(n, steps);
        return steps;
    }
}
