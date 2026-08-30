import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        // メモ化のためのマップ
        Map<Long, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }

            try {
                long n = Long.parseLong(line.trim());
                if (n == 1) {
                    // n=1 の場合は手数は 0
                    totalCount += 0;
                    continue;
                }

                // メモがあればそれを採用
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 再帰または反復計算
                long count = 0;
                long current = n;
                // 計算過程でサイクルを検出するために、訪問履歴を保持する
                // ここでは、サイクル検出とメモ化を同時に行うために、計算の過程で次の状態を追跡する
                
                // サイクル検出用の追跡用マップ（現在の計算パス）
                Map<Long, Long> path = new HashMap<>();
                long steps = 0;
                boolean inCycle = false;

                while (current != 1) {
                    if (memo.containsKey(current)) {
                        // 既に計算済みの値に到達した場合
                        long memoizedSteps = memo.get(current);
                        long cycleStartSteps = path.get(current);
                        
                        // サイクルを計算
                        long cycleLength = steps - cycleStartSteps;
                        long stepsToTarget = memoizedSteps + (steps - cycleStartSteps) % cycleLength;
                        
                        count = stepsToTarget;
                        
                        // サイクル全体をメモ化（現在のパス上のすべてのノード）
                        for(Map.Entry<Long, Long> entry : path.entrySet()) {
                            memo.put(entry.getKey(), stepsToTarget);
                        }
                        break;
                    }

                    if (path.containsKey(current)) {
                        // サイクル検出
                        inCycle = true;
                        long cycleStartStep = path.get(current);
                        long cycleLength = steps - cycleStartStep;
                        
                        // サイクル内の移動数
                        long remainingSteps = (steps - cycleStartStep) % cycleLength;
                        
                        // サイクル内の移動数 + サイクルスタートからの移動数
                        long stepsToTarget = cycleStartStep + remainingSteps;
                        
                        count = stepsToTarget;
                        
                        // サイクル内のすべての要素をメモ化
                        for(Map.Entry<Long, Long> entry : path.entrySet()) {
                            memo.put(entry.getKey(), stepsToTarget);
                        }
                        break;
                    }

                    // 次のステップの計算と追跡
                    path.put(current, steps);
                    
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }

                if (current == 1) {
                    // サイクルに捕まらずに到達した場合
                    count = steps;
                    // 到達した経路全体をメモ化
                    for(Map.Entry<Long, Long> entry : path.entrySet()) {
                        memo.put(entry.getKey(), count);
                    }
                }
                
                // 計算結果を合計に加算
                totalCount += count;
                
                // ただし、計算が非常に深くなる可能性を考慮し、
                // 単純な繰り返し計算とメモ化に限定する（サイクル検出が最も効率的）
                // フィボナッチ数列的な性質（3n+1問題）から、サイクル検出は必須。

            } catch (NumberFormatException e) {
                // 数値として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
