import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null && !line.trim().isEmpty()) {
            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // 1 のときの手数は 0
                    total += 0;
                    continue;
                }

                // メモ化された値があるか確認
                if (memo.containsKey(n)) {
                    total += memo.get(n);
                    continue;
                }

                // 再帰計算とメモ化
                long steps = 0;
                long current = n;
                Map<Long, Long> path = new HashMap<>(); // 経路を追跡するためのマップ

                while (current != 1) {
                    if (memo.containsKey(current)) {
                        // 途中からメモ化された値があればそれを利用
                        steps += memo.get(current);
                        current = 1; // 一旦終了
                        break;
                    }
                    
                    // 経路を記録し、現在の値での計算を続ける
                    path.put(current, steps);

                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }
                
                // 最終的な値が1になった場合の処理（再帰的な構造を考慮したメモ化の更新）
                if (current == 1) {
                    // 経路を遡って、各ステップのコストを計算し直すのではなく、
                    // 今回計算した n から 1 に到達するまでの全過程のコストを記録する
                    // ここでは、単純に n から 1 への最短経路の数を求める問題なので、
                    // 各 n の計算を直接行うのが効率的だが、再帰のメモ化を適用する。
                    
                    // ここでは、n から 1 への経路を追跡し、その過程でメモ化された値を利用するように修正する。
                    
                    // 再計算を避けるため、n が1になるまでの全ステップを計算し、その合計を記録する
                    // （上記ループはあくまで再帰的な計算の準備のため、ここでは直接計算を行う）
                    
                    long calculatedSteps = 0;
                    long tempN = n;
                    
                    // n から 1 への経路を計算し、途中の値をメモ化に記録する
                    // この問題は通常、Hofstadterの54題的な問題であり、各 n について直接計算する問題です。
                    // 繰り返し現れる値があるため、サイクル検出とメモ化が必要です。
                    
                    // 簡易的なメモ化（フィボナッチ数列的なアプローチ）を採用する
                    
                    long finalSteps = 0;
                    long check = n;
                    Map<Long, Long> currentPath = new HashMap<>();
                    currentPath.put(n, 0L); // n からのステップ数は 0 (自分自身)

                    // サイクル検出のためのセット
                    java.util.Set<Long> visited = new java.util.HashSet<>();
                    visited.add(n);
                    
                    // ここでは、n から 1 に到達するまでの最小ステップ数を求める。
                    // サイクルを検出したら、そのサイクルがどういう意味を持つかを考慮する必要があるが、
                    // 1に到達するという制約があるので、サイクル検出は不要で、単純なメモ化で十分。
                    
                    // 再度、シンプルに n から 1 へのパスを計算し、メモ化するアプローチに戻る。
                    
                    // 以前の計算結果を総和に加算する
                    total += 0; // 今回はループ内で直接計算するため、この部分は無効

                    // 実際の手順：n から 1 へのパスを計算し、その総和を求める
                    long stepsFromN = 0;
                    long currentN = n;
                    Map<Long, Long> currentMemo = new HashMap<>(); // このnの計算で使われるメモ化

                    while (currentN != 1) {
                        if (currentMemo.containsKey(currentN)) {
                            // 既に計算済みの値があれば利用
                            stepsFromN += currentMemo.get(currentN);
                            break;
                        }
                        
                        // サイクル検出のためのセット（厳密には不要かもしれないが、無限ループを防ぐ）
                        // ただし、この問題設定では必ず 1 に収束すると仮定する。
                        
                        if (currentN == n) {
                            // サイクルに陥った場合 (理論上は発生しないはずだが念のため)
                            // この場合、サイクル全体を処理する必要がある。
                            // 今回は、単純なパスとして計算を続ける。
                        }

                        if (currentN % 2 == 0) {
                            currentN = currentN / 2;
                        } else {
                            currentN = 3 * currentN + 1;
                        }
                        stepsFromN++;
                    }
                    
                    // n の計算結果をメモ化に保存
                    memo.put(n, stepsFromN);
                    total += stepsFromN;
                }

            } catch (NumberFormatException e) {
                // 無効な入力は無視
            }
        }

        System.out.println("total=" + total);
    }
}
