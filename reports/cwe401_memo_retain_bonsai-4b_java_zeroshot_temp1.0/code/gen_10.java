import java.util.*;

public class Main {
    private static Map<Integer, Integer> memo = new HashMap<>();
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> inputs = new ArrayList<>();
        
        // 前処理：すべての整数を読み取る
        while (true) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) {
                break;
            }
            String[] parts = line.trim().split("\\s+");
            for (String part : parts) {
                if (part.matches("\\d+")) {
                    int n = Integer.parseInt(part);
                    inputs.add(n);
                }
            }
        }
        
        // 手数計算（memo化）
        for (int n : inputs) {
            memo.put(n, getSteps(n));
        }
        
        // チェック：1 が達するまでの手数をすべて取得
        // 確保する：nが1なら0、それ以外は処理済み
        int total = 0;
        for (int n : inputs) {
            total += memo.get(n);
        }
        
        System.out.println("total=" + total);
    }
    
    private static int getSteps(int n) {
        if (n == 1) return 0;
        
        if (memo.containsKey(n)) return memo.get(n);
        
        int steps = 1;
        int current = n;
        
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
