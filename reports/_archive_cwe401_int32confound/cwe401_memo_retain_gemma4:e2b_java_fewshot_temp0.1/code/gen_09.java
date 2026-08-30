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
                    while (current != 1 && !memo.containsKey(current)) {
                        if (memo.containsKey(current)) {
                            // 既に計算済みの値に到達した場合
                            steps += memo.get(current);
                            current = 1; // 1に到達したと仮定してループを抜ける
                            break;
                        }
                        
                        // サイクル検出のための履歴管理（ここでは単純化のため、到達した値のみを記録）
                        // 厳密には、現在のパスでのサイクルを検出する必要があるが、
                        // この問題は通常、n -> n/2 or 3n+1 の操作で1に到達するまでの経路を問うため、
                        // 1に到達するまでの最短経路を求める問題として解釈し、メモ化で最適化する。
                        
                        // サイクル検出をより厳密に行うため、現在のパスを記録する
                        Map<Integer, Long> path = new HashMap<>();
                        int temp = n;
                        long currentSteps = 0;
                        
                        // サイクル検出と経路計算
                        while (temp != 1 && !memo.containsKey(temp)) {
                            if (path.containsKey(temp)) {
                                // サイクル検出
                                long cycleStartStep = path.get(temp);
                                long cycleLength = currentSteps - cycleStartStep;
                                
                                // サイクル内の移動を計算
                                long remainingSteps = (long) (1 - temp) * (cycleLength / temp); // これは複雑すぎるため、ここでは単純にサイクルをスキップする
                                
                                // サイクルをスキップして、1に到達するまでの計算を再構築する
                                // この問題は通常、n -> n/2 or 3n+1 の操作で1に到達するまでの「手数」を求めるため、
                                // サイクル検出は、そのサイクルが1に到達する経路にどう影響するかを考慮する必要がある。
                                // しかし、この問題の文脈（Collatz-like）では、通常、1に到達するまでのステップ数を求めるため、
                                // サイクル検出は「到達した値が既に計算済みか」をチェックするだけで十分なことが多い。
                                
                                // ここでは、単純にメモ化された値にジャンプする方針を採用する。
                                // サイクル検出は、もしサイクルが1を含まない場合、無限ループになる可能性があるため、
                                // 1に到達する経路を保証する操作（n/2, 3n+1）が常に適用されることを前提とする。
                                
                                // サイクル検出を無視し、メモ化された値にジャンプする（Collatz問題の標準的なメモ化手法）
                                break; 
                            }
                            
                            path.put(temp, currentSteps);
                            if (temp % 2 == 0) {
                                temp /= 2;
                            } else {
                                temp = 3 * temp + 1;
                            }
                            currentSteps++;
                        }
                        
                        if (temp == 1) {
                            steps = currentSteps;
                        } else if (memo.containsKey(temp)) {
                            // 既に計算済みの値に到達した場合
                            steps = currentSteps + memo.get(temp);
                        } else {
                            // サイクル検出が複雑になるため、ここでは単純に再帰的または反復的に1に到達するまで計算する
                            // サイクル検出を厳密に行う代わりに、到達するまで計算を続ける
                            // (この問題は通常、サイクルを考慮した最適化が求められるが、ここでは単純なメモ化で対応する)
                            
                            // 再度、メモ化された値にジャンプする
                            steps = currentSteps + memo.get(temp);
                        }
                        
                        // 最終的な結果をメモ化
                        memo.put(n, steps);
                        break; // ループを抜ける
                    }
                    
                    // 1に到達するまでの手数を計算し、合計に加算
                    if (memo.containsKey(n)) {
                        total += memo.get(n);
                    }
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }
}
