import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Long, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }
            
            // 空行や整数として解釈できない行を無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());
                if (n < 1) {
                    continue; // 1以上の整数のみを対象とする
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    long steps = memo.get(n);
                    totalCount += steps;
                    continue;
                }

                // 1に到達するまでの手数を計算
                if (n == 1) {
                    long steps = 0;
                } else {
                    long current = n;
                    long steps = 0;
                    // 経路を記録してメモ化のために使用
                    // サイクル検出とメモ化を同時に行う
                    Map<Long, Long> path = new HashMap<>();
                    path.put(n, 0L);
                    
                    while (current != 1) {
                        if (path.containsKey(current)) {
                            // サイクル検出
                            long startStep = path.get(current);
                            long cycleLength = steps - startStep;
                            
                            // サイクル内の移動を考慮して手数を計算
                            // サイクルに入った後の残りステップ数を計算
                            long remainingSteps = (steps - startStep) % cycleLength;
                            long finalSteps = startStep + remainingSteps;
                            
                            // サイクルに到達した時点で、現在のnから1への最短経路は、
                            // サイクル内の移動を考慮した上で、1への到達を保証する必要がある。
                            // ただし、この問題は「1に到達するまでの手数」なので、
                            // サイクル内の移動が1への到達を保証しない場合は、
                            // サイクルを検出した時点で、そのサイクルが1に到達する経路を再計算する必要がある。
                            // しかし、この問題の性質上、3n+1操作は通常、1に収束することが知られている（コナーの予想）。
                            // サイクル検出は、計算の効率化のためであり、1への到達が保証されている場合、
                            // サイクル内の移動は、そのサイクルを抜けるためのステップ数としてカウントされる。
                            
                            // 簡略化のため、ここではサイクル検出が1への到達を保証しない場合でも、
                            // サイクル検出をメモ化のトリガーとして使用し、再帰的な計算を避ける。
                            // サイクル検出が成功した場合、そのサイクル全体が1に到達する経路を計算する。
                            // しかし、今回は「1に到達するまでの手数」なので、サイクルを検出したら、
                            // サイクル内の移動をスキップして、1への到達を保証する。
                            
                            // ここでは、サイクル検出がされた場合、そのサイクル内の移動は、
                            // 1への到達を保証しないため、単純に再計算に戻るか、
                            // サイクルを検出した時点で、そのサイクル内のパスを再計算する。
                            // 最も安全なのは、サイクル検出をメモ化のトリガーとしてのみ使用し、
                            // 1への到達が保証されることを前提に、単純なパスを追うこと。
                            
                            // サイクル検出が成功した場合、そのサイクル内の移動は、
                            // 1への到達を保証しないため、ここではサイクル検出をスキップし、
                            // 単純に1への到達を追うことに焦点を当てる。
                            // サイクル検出は、より複雑な問題（例：サイクル内の最小値）で重要になる。
                            // 今回は、単純なメモ化として、到達した時点で計算を終了する。
                            
                            // サイクル検出を無視し、単純なパスを追う（メモ化は、同じ値が再出現した場合のみ）
                            // サイクル検出を無視し、単純なパスを追う
                            break; // サイクル検出は一旦無視し、単純なパスを追う
                        }
                        
                        path.put(current, steps);
                        
                        if (current == 1) {
                            steps = path.get(current) + 1;
                            break;
                        }

                        if (current > 1000000000L) { // 非常に大きな値が出た場合の安全策（32bit/64bitの制約を考慮）
                            // 実際には、この問題は1に収束するため、この分岐は理論上不要だが、
                            // 敵対的な入力に対応するため、計算が無限に続くことを防ぐ。
                            // 実際には、3n+1操作は必ず収束するため、この分岐は到達しないはず。
                            break; 
                        }

                        if (current % 2 == 0) {
                            current = current / 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        steps++;
                    }
                    
                    if (current == 1) {
                        steps = path.getOrDefault(n, 0L) + 1; // 最後のステップを正しく計算
                    } else {
                        // サイクル検出が機能しなかった場合、または特殊なケースの場合
                        // 再度、単純な計算で手数を求める（メモ化の恩恵が限定的になる）
                        long current_recalc = n;
                        long steps_recalc = 0;
                        while (current_recalc != 1) {
                            if (current_recalc % 2 == 0) {
                                current_recalc /= 2;
                            } else {
                                current_recalc = 3 * current_recalc + 1;
                            }
                            steps_recalc++;
                        }
                        steps = steps_recalc;
                    }

                    // メモに結果を保存
                    memo.put(n, steps);
                }
                
                totalCount += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
