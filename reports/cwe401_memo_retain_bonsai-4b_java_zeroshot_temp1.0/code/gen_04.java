import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Map<Integer, Integer> memo = new HashMap<>();
        
        while (true) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) {
                break;
            }
            try {
                int n = Integer.parseInt(line);
                int steps = getSteps(n, memo);
                memo.put(n, steps);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        int totalSteps = 0;
        for (int i = 1; i <= 100000; i++) {
            if (memo.containsKey(i)) {
                totalSteps += memo.get(i);
            }
        }
        
        System.out.println("total=" + totalSteps);
    }
    
    private static int getSteps(int n, Map<Integer, Integer> memo) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        
        int next = (n % 2 == 0) ? n / 2 : 3 * n + 1;
        int result = 1 + getSteps(next, memo);
        memo.put(n, result);
        return result;
    }
}
