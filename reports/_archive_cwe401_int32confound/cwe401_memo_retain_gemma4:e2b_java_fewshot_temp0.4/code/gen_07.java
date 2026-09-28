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
                    // 1に到達するまでの手数は0
                    long steps = 0;
                    total += steps;
                    // メモ化
                    memo.put(n, steps);
                } else {
                    // 繰り返し操作をシミュレーションし、メモ化された値を利用
                    int current = n;
                    long steps = 0;
                    // サイクル検出とメモ化を同時に行う
                    while (current != 1 && !memo.containsKey(current)) {
                        if (memo.containsKey(current)) {
                            // 既にメモがあれば、その値を使って計算を続ける
                            steps += memo.get(current);
                            current = 1; // 1に到達したと仮定してループを抜ける
                            break;
                        }
                        
                        // サイクル検出のための一時的な経路記録
                        // 経路を記録するマップ (現在の値 -> 手数)
                        Map<Integer, Long> path = new HashMap<>();
                        int temp = current;
                        long tempSteps = 0;
                        
                        // サイクルに入るまで進む
                        while (temp != 1 && !memo.containsKey(temp) && !path.containsKey(temp)) {
                            path.put(temp, tempSteps);
                            if (temp % 2 == 0) {
                                temp = temp / 2;
                            } else {
                                temp = 3 * temp + 1;
                            }
                            tempSteps++;
                        }

                        if (temp == 1) {
                            // 1に到達した場合
                            steps += tempSteps;
                            // 経路上の全ての要素をメモ化
                            for(Map.Entry<Integer, Long> entry : path.entrySet()){
                                memo.put(entry.getKey(), tempSteps + (1 - temp)); // 1に到達した後の残り
                            }
                            break;
                        } else if (path.containsKey(temp)) {
                            // サイクルに落ちた場合 (tempが既にpathに含まれている)
                            // サイクル内の手数を計算
                            long cycleStartSteps = path.get(temp);
                            long cycleLength = tempSteps - cycleStartSteps;
                            
                            // サイクルをスキップして1に到達するまでの手数を計算
                            steps += cycleStartSteps; // サイクルに入るまでの手数
                            // サイクルを何回繰り返すか
                            long remainingSteps = (steps - cycleStartSteps) / cycleLength;
                            
                            // 1に到達するまでの残り
                            long stepsInCycle = (steps - cycleStartSteps) % cycleLength;
                            
                            // 1に到達するまでの総手数を計算
                            long totalSteps = steps + stepsInCycle;
                            
                            // 1に到達するまでの手数をメモ化
                            memo.put(n, totalSteps);
                            break;
                        } else {
                            // サイクル検出がうまくいかなかった場合（理論上は発生しないはずだが念のため）
                            // 次のステップに進む
                            current = temp;
                            steps = tempSteps;
                        }
                    }
                    
                    // 最終的な計算結果がメモ化されていない場合（単調増加の場合など）
                    if (!memo.containsKey(n)) {
                        // サイクル検出が複雑になったため、単純な再帰的なメモ化（またはよりシンプルなループ）を試みる
                        // 今回の操作はCollatz予想であり、サイクル検出とメモ化が鍵となる。
                        // 簡略化のため、再帰的メモ化を試みる（ただし、再帰の深さに注意が必要）
                        
                        // 再帰的なメモ化を試みる（より安全なアプローチ）
                        long calculateSteps(int k, Map<Integer, Long> memo) {
                            if (k == 1) return 0;
                            if (memo.containsKey(k)) return memo.get(k);

                            // サイクル検出用のスタック
                            Map<Integer, Long> path = new HashMap<>();
                            int currentK = k;
                            long steps = 0;
                            
                            // サイクル検出
                            while (currentK != 1 && !memo.containsKey(currentK) && !path.containsKey(currentK)) {
                                path.put(currentK, steps);
                                if (currentK % 2 == 0) {
                                    currentK /= 2;
                                } else {
                                    currentK = 3 * currentK + 1;
                                }
                                steps++;
                            }

                            if (currentK == 1) {
                                // 1に到達
                                long result = steps;
                                for(Map.Entry<Integer, Long> entry : path.entrySet()){
                                    memo.put(entry.getKey(), result - steps + entry.getValue()); // サイクル内の手数を考慮
                                }
                                return result;
                            } else if (path.containsKey(currentK)) {
                                // サイクルに落ちた
                                long cycleStartSteps = path.get(currentK);
                                long cycleLength = steps - cycleStartSteps;
                                
                                // 1に到達するまでの手数を計算
                                long stepsTo1 = cycleStartSteps + (steps - cycleStartSteps) % cycleLength;
                                
                                for(Map.Entry<Integer, Long> entry : path.entrySet()){
                                    memo.put(entry.getKey(), stepsTo1 - cycleStartSteps + entry.getValue());
                                }
                                return stepsTo1;
                            } else {
                                // 既にメモされている場合（再帰呼び出しの構造上、これは通常発生しない）
                                return memo.get(k);
                            }
                        }
                        
                        // 再計算とメモ化
                        long result = calculateSteps(n, memo);
                        memo.put(n, result);
                    }
                    
                    total += memo.get(n);
                }
            } catch (NumberFormatException e) {
                // 無効な入力は無視
            }
        }

        System.out.println("total=" + total);
    }
}
