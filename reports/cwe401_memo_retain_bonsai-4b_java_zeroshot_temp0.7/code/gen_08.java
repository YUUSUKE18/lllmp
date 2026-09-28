import java.util.*;

public class Main {
    private static Map<Integer, Integer> memo = new HashMap<>();
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> inputs = new ArrayList<>();
        
        // 標準入力に1以上の整数を読み取る
        while (true) {
            try {
                String line = scanner.nextLine();
                if (line.trim().isEmpty()) continue;
                String[] tokens = line.trim().split("\\s+");
                if (tokens.length == 0) continue;
                inputs.add(Integer.parseInt(tokens[0]));
            } catch (NumberFormatException e) {
                // その行は無視
                continue;
            }
            if (inputs.size() >= 1) break;
        }
        
        // 各クエリ n に対して、n/2 や 3n+1 を繰り返して1に到達するまでの手数を計算
        int total = 0;
        for (int n : inputs) {
            int steps = calculateSteps(n);
            total += steps;
        }
        
        // 最終の結果を出力
        System.out.println("total=" + total);
    }
    
    private static int calculateSteps(int n) {
        if (n == 1) return 0;
        
        // メモ化
        if (memo.containsKey(n)) return memo.get(n);
        
        int steps = 1;
        int current = n;
        
        // 32bit 整数では収まりないため、64bit や他の大整数でも安全に処理
        // しかし、問題文は「64bit 整数の範囲」に収まります
        while (current != 1) {
            if (current % 2 == 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // メモ化
        memo.put(n, steps);
        
        return steps;
    }
}
