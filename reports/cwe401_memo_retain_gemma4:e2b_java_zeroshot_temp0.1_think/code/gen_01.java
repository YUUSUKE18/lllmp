import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    // メモ化テーブル: 既に計算済みの数とその手数を保存する
    private static Map<Long, Integer> memo = new HashMap<>();

    /**
     * 与えられた数 n から 1 に到達するまでの手数を計算する。
     * メモ化を使用して計算を高速化する。
     *
     * @param n 開始数
     * @return 1 に到達するまでの手数
     */
    private static int countSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long current = n;
        // 現在のパスを記録し、ループ中にメモ化を効率的に行う
        // ただし、再帰的なメモ化（DFS）よりも、現在のパスを追跡しながらメモ化を行う方が、
        // 途中の値が非常に大きくなる可能性を考慮しつつ、効率的である。
        
        // ここでは、現在のパスを追跡し、到達した値が既にメモ化されているかを確認する
        // 途中の値が非常に大きくなる可能性があるため、再帰ではなく反復処理で計算する。
        
        // 経路を追跡するためのリスト
        java.util.LinkedList<Long> path = new java.util.LinkedList<>();
        
        while (current != 1) {
            if (memo.containsKey(current)) {
                // 既に計算済みの値に到達した場合、その手数を加算して終了
                int stepsFromCurrent = memo.get(current);
                int totalSteps = path.size() + stepsFromCurrent;
                
                // 現在のパスの値をすべてメモ化する
                for (long val : path) {
                    memo.put(val, totalSteps - (path.indexOf(val) == -1 ? 0 : path.indexOf(val))); // 複雑なメモ化の調整が必要だが、ここでは単純に現在のパスの長さで計算する
                }
                return totalSteps;
            }
            
            path.add(current);

            if (current % 2 == 0) {
                current /= 2;
            } else {
                // 3n + 1
                current = 3 * current + 1;
            }
        }

        // 1 に到達した場合、手数はパスの長さ
        int steps = path.size();
        
        // パス全体をメモ化する
        // 1 から n までのすべての値について、1 に到達するまでの手数を計算し、メモ化する
        // ただし、この実装では、現在のパスの長さが n から 1 への手数となる。
        for (int i = 0; i < path.size(); i++) {
            long val = path.get(i);
            // 1 に到達するまでの手数を計算し、メモ化する
            // この再帰的な構造を避けるため、ここでは単純に現在のパスの長さのみをメモ化する。
            // より厳密なメモ化のためには、再帰的な構造を採用し、到達した時点で結果を返すのが一般的。
            // 今回は、計算過程で発生した値のみをメモ化する。
            if (val != 1) {
                // 実際の手数計算は、この関数呼び出し全体で行われるため、
                // ここでは、現在のパスの長さが、この呼び出しにおける n から 1 への手数となる。
                // ただし、これは全体的なメモ化戦略と矛盾するため、
                // 最終的な結果のみをメモ化する戦略に切り替える。
            }
        }
        
        // 最終的な結果をメモ化
        memo.put(n, steps);
        return steps;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
        String line;

        // 標準入力からクエリを読み込む
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line);
                
                // nが1の場合、手数は0
                if (n == 1) {
                    // 1は既にメモ化されているはずだが、念のため
                    if (!memo.containsKey(1)) {
                        memo.put(1L, 0);
                    }
                    continue;
                }

                // 計算とメモ化
                // countSteps関数内で再帰的なメモ化を試みるが、
                // 複雑なパス追跡とメモ化を同時に行うため、ここでは単純に反復計算とメモ化を行う。
                
                long current = n;
                int steps = 0;
                
                // 経路を追跡し、メモ化を同時に行う
                java.util.LinkedList<Long> path = new java.util.LinkedList<>();
                
                while (current != 1) {
                    if (memo.containsKey(current)) {
                        steps += memo.get(current);
                        // 既にメモ化されている値に到達した場合、残りのパスを計算する必要はない
                        break; 
                    }
                    
                    path.add(current);

                    if (current % 2 == 0) {
                        current /= 2;
                    } else {
                        current = 3 * current + 1;
                    }
                }
                
                // 1 に到達した、またはメモ化された値に到達した後の処理
                if (current == 1) {
                    steps = path.size();
                } else if (memo.containsKey(current)) {
                    // 途中でメモ化された値に到達した場合
                    steps = path.size() + memo.get(current);
                } else {
                    // 1に到達しなかったが、計算が終了した（通常は到達するはず）
                    // このケースは、上記ループの構造上、到達しないことはないはず。
                    // 安全のため、パスの長さを採用する。
                    steps = path.size();
                }
                
                // 最終結果をメモ化
                memo.put(n, steps);
                totalSteps += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // 結果の出力
        System.out.println("total=" + totalSteps);
    }
}
