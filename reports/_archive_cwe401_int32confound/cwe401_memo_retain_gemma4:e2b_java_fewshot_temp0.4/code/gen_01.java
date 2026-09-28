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
                    // nが1のときの手数は0
                    long steps = 0;
                    total += steps;
                    // メモ化
                    memo.put(n, steps);
                } else {
                    // 操作の繰り返しをシミュレーションし、メモ化を利用して手数を計算
                    int currentN = n;
                    long steps = 0;
                    
                    // サイクル検出とメモ化の利用
                    Map<Integer, Long> path = new HashMap<>();
                    path.put(n, 0L);
                    
                    while (currentN != 1) {
                        if (path.containsKey(currentN)) {
                            // サイクル検出。この問題の操作は必ず1に収束するため、通常は発生しないが念のため
                            // サイクル内の手数を計算して終了
                            long stepsInCycle = path.get(currentN);
                            steps += (Math.abs(path.get(n) - path.get(currentN))) * (currentN - n) / 2; // 厳密なサイクル計算は複雑になるため、ここでは単純に到達までのステップを追う
                            // この問題は「1に到達するまでの手数」を問うため、サイクル検出よりも直接的な追跡が求められる。
                            // サイクル検出は、操作が必ず1に収束する（Collatz conjecture）という仮定に基づき、到達までのステップを追うのが最も安全。
                            break; 
                        }
                        
                        long currentSteps = path.getOrDefault(currentN, 0L);
                        
                        if (currentN % 2 == 0) {
                            currentN /= 2;
                        } else {
                            currentN = 3 * currentN + 1;
                        }
                        
                        path.put(currentN, currentSteps + 1);
                        steps++;
                    }
                    
                    // 最終的な手数を計算し、合計に加算
                    if (currentN == 1) {
                        total += steps;
                        // 経路上のすべての値についてメモ化（再利用のため）
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
