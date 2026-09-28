import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        Map<Integer, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            try {
                int n = Integer.parseInt(line.trim());
                if (n <= 0) continue;

                if (n == 1) {
                    // 1 に到達するまでの手数は 0
                    long steps = 0;
                    total += steps;
                    // メモ化
                    memo.put(n, steps);
                } else {
                    // 繰り返し操作をシミュレーションし、メモ化を利用して計算
                    int current = n;
                    long steps = 0;
                    
                    // サイクル検出とメモ化を同時に行う
                    // 1 に到達するまでの経路を追跡
                    Map<Integer, Long> path = new HashMap<>();
                    path.put(n, 0L);
                    
                    while (current != 1) {
                        if (path.containsKey(current)) {
                            // サイクル検出。この問題の操作は必ず1に収束するため、通常は発生しないはずだが、念のため。
                            // ここでは、1に到達するまでのステップ数を求めるため、サイクル検出は不要だが、
                            // 効率化のために、既に計算済みの値があればそれを利用する。
                            // 実際には、n -> n/2 (偶数) または 3n+1 (奇数) の操作は、
                            // 1に到達するまでの経路を辿ることで計算する。
                            break; 
                        }
                        
                        long next_steps = 0;
                        if (current % 2 == 0) {
                            // n が偶数なら n/2
                            current = current / 2;
                        } else {
                            // n が奇数なら 3n+1
                            current = 3 * current + 1;
                        }
                        
                        steps++;
                        path.put(current, steps);
                    }
                    
                    if (current == 1) {
                        total += steps;
                        // 経路上の全ての値をメモ化（再利用のため）
                        for (Map.Entry<Integer, Long> entry : path.entrySet()) {
                            memo.put(entry.getKey(), entry.getValue());
                        }
                    }
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }
}
