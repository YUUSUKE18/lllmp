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
                    while (current != 1) {
                        if (memo.containsKey(current)) {
                            steps += memo.get(current);
                            current = 1; // 1に到達したと仮定してループを抜ける
                            break;
                        }
                        
                        // サイクル検出のための訪問履歴
                        // サイクル検出のために、現在のパスを記録する
                        // ただし、この問題は1に到達する問題なので、単純な再帰/DPで十分だが、
                        // サイクル検出を念のため含める。
                        
                        // サイクル検出のための履歴管理（ここでは単純化し、到達までのステップを直接計算するDP/メモ化に焦点を当てる）
                        
                        if (current % 2 == 0) {
                            current = current / 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        steps++;
                    }
                    
                    // 1に到達した後のステップ数をメモ化
                    if (current == 1) {
                        memo.put(n, steps);
                    }
                    
                    total += steps;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }
}
