import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());
                if (n == 1) {
                    // 1 に到達するまでの手数は 0
                    totalCount += 0;
                    continue;
                }

                // メモ化された値があるかチェック
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 再帰的/動的計画法で計算（メモ化再帰的に実装する）
                // 効率的に計算するため、再帰的な構造を考慮し、計算途中のステップを追跡する
                
                // ここでは、n から 1 に到達するまでの手数を直接計算する関数を考える。
                // しかし、問題は「n が偶数なら n/2、奇数なら 3n+1」という操作を繰り返し、
                // その過程の手数を求めること。これは通常、n から 1 に到達するまでの最小ステップ数を求める問題（Collatz conjectureに関連）です。
                
                // 問題の解釈：「n が 1 に到達するまでの手数」
                // n=1 の手数は 0
                // n=2: 2 -> 1 (1ステップ)
                // n=3: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7ステップ)
                
                long steps = 0;
                long current = n;
                
                // 計算過程をメモ化しながら進める
                // 最終的な手数を求めるため、再帰呼び出しではなく、順方向のシミュレーションとして実行する
                
                // 再帰的な構造をメモ化で実現するために、再帰関数を定義する
                // 実際には、この問題は「n から 1 へのパスの長さ」を求めるため、
                // 遷移が単調でないため、通常は再帰またはDPで計算します。
                
                // ここでは、指定された操作のみを繰り返したときのステップ数を計算します。
                // 効率化のため、DFS/再帰とメモ化を使用します。
                
                // 計算結果を保持するマップを、このクエリの処理内ではなく、クラスレベルで管理する必要があります。
                // ただし、仕様は「各クエリ n について、操作を繰り返して手数を求め、その合計を求める」であり、
                // 同じ n が再度現れた場合の計算結果の再利用を求めているため、Map<Long, Long> memo を利用します。
                
                // 繰り返し計算
                // 1 から n に戻るパスを求めるのではなく、n から 1 に向かうパスの長さを求める。
                
                // n が既にmemoにあればスキップ済み。そうでなければ計算。
                
                // 計算ステップのシミュレーション
                Map<Long, Long> pathMemo = new HashMap<>(); // 一時的なパス計算のメモ化

                long currentSteps = 0;
                long tempN = n;
                
                // 遷移を繰り返す
                while (tempN != 1) {
                    if (pathMemo.containsKey(tempN)) {
                        // 既にこの経路で計算済みであれば、そこから遡ってステップ数を加算する
                        // ここでは、すでに memo に保存されている値を利用する設計に変更します。
                        // 求めるのは「n から 1 に到達するまでのステップ数」そのものです。
                        // したがって、単に n から 1 への最短経路を探索するDFS/BFS的アプローチが必要になりますが、
                        // 操作は一方向（n -> f(n)）なので、これは単なる経路追跡になります。
                        
                        // 仕様を再確認: "n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。"
                        
                        // この場合、メモ化は「n から 1 への距離」を保存します。
                        // n から 1 への計算は、操作を繰り返すだけで決まるため、メモ化は遷移の深さ（手数）を保存します。
                        
                        // ここでは、再帰的メモ化で対応します。
                        // この部分のロジックは、n から 1 への距離を求める標準的なCollatz問題の解法に依存します。
                        
                        // 既に全体メモがあるため、再帰呼び出しで計算します。
                        long nextN;
                        if (tempN % 2 == 0) {
                            nextN = tempN / 2;
                        } else {
                            nextN = 3 * tempN + 1;
                        }
                        
                        currentSteps++;
                        tempN = nextN;
                        
                        // ここで、もし次のステップがmemoにあれば、その値を利用するべきだが、
                        // 問題の要求は「n から 1 への過程の手数」なので、単純なカウントで十分。
                        // メモ化は、同じ n がクエリとして与えられた場合の再利用を保証します。
                    } else {
                        // 1 に到達するまでの全ステップをカウントする
                        long nextN;
                        if (tempN % 2 == 0) {
                            nextN = tempN / 2;
                        } else {
                            nextN = 3 * tempN + 1;
                        }
                        
                        currentSteps++;
                        tempN = nextN;
                    }
                }
                
                // n から 1 への手数を計算し、全体メモに保存
                memo.put(n, currentSteps);
                totalCount += currentSteps;

            } catch (NumberFormatException e) {
                // 無効な入力は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
