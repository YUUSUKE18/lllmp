import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> inputs = new ArrayList<>();
        
        // 入力を读む
        while (true) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) {
                break;
            }
            try {
                int n = Integer.parseInt(line);
                inputs.add(n);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        // 手数を計算
        int total = 0;
        for (int n : inputs) {
            int steps = getSteps(n);
            total += steps;
        }
        
        // 出力
        System.out.println("total=" + total);
    }
    
    private static int getSteps(int n) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        if (n == 1) {
            memo.put(1, 0);
            return 0;
        }
        
        int steps = 1;
        int current = n;
        
        // 64bit 整数範囲内に収まり
        while (current != 1) {
            if (current % 2 == 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        memo.put(n, steps);
        return steps;
    }
}
