import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> inputs = new ArrayList<>();
        
        // 入力を読み取る
        while (true) {
            try {
                String line = scanner.nextLine();
                if (line.trim().isEmpty()) {
                    break;
                }
                inputs.add(Integer.parseInt(line));
            } catch (NumberFormatException e) {
                // 无効な行は無視
                continue;
            }
        }
        
        // メモを更新し、計算結果をキャッシュ
        int total = 0;
        for (int n : inputs) {
            int steps = computeSteps(n);
            total += steps;
        }
        
        System.out.println("total=" + total);
    }
    
    private static int computeSteps(int n) {
        if (n == 1) {
            return 0;
        }
        
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int steps = 1;
        int current = n;
        
        // 32bit 整数範囲内に収まり、64bit でも収まり
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
