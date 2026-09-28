import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> inputs = new ArrayList<>();
        
        // すべての入力を読み取る
        while (true) {
            try {
                String line = scanner.nextLine();
                if (line.trim().isEmpty()) {
                    break;
                }
                inputs.add(Integer.parseInt(line));
            } catch (NumberFormatException e) {
                // 无効な入力はスキップ
                continue;
            }
        }
        
        // 手数を計算し、合計を累積
        int total = 0;
        for (int n : inputs) {
            int steps = getSteps(n);
            total += steps;
        }
        
        // 最终の出力
        System.out.println("total=" + total);
    }
    
    private static int getSteps(int n) {
        if (n == 1) return 0;
        
        if (memo.containsKey(n)) return memo.get(n);
        
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
