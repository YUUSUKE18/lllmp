import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> inputs = new ArrayList<>();
        
        // すべての整数を読み取
        while (true) {
            try {
                String line = scanner.nextLine();
                if (line.trim().isEmpty()) {
                    continue;
                }
                int n = Integer.parseInt(line);
                inputs.add(n);
            } catch (NumberFormatException e) {
                continue;
            }
            if (n > 0) {
                memo.put(n, 0); // n == 1
            }
        }
        
        // 手数を計算
        int total = 0;
        for (int n : inputs) {
            total += computeSteps(n, memo);
        }
        
        System.out.println("total=" + total);
    }
    
    private static int computeSteps(int n, Map<Integer, Integer> memo) {
        if (n <= 0) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int steps = 1;
        int current = n;
        
        // 1を达成まで繰り返し
        while (current != 1) {
            if (current % 2 == 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
            
            // 64bit 整数の範囲内に収まるように注意
            if (current > Integer.MAX_VALUE || current < Integer.MIN_VALUE) {
                break;
            }
        }
        
        memo.put(n, steps);
        return steps;
    }
}
