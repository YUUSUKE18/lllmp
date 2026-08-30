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
            // 空行の無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // nが1のときの手数は0
                    // memo.put(1L, 0L); // 1の場合は0なので明示的に保存しても良いが、計算過程で到達する値のみを保存すれば十分
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    long count = memo.get(n);
                    totalCount += count;
                    continue;
                }

                // 再帰/動的計画法による計算
                long currentN = n;
                long steps = 0;
                // 訪問履歴と手数を記録するためのセット（サイクル検出用）
                // ただし、この問題は1に到達するまでの最短経路を求めるため、サイクル検出よりも到達可能性と最短経路の計算が主となる。
                // 1に到達する過程で、既に計算済みの値に到達した場合にmemoを使用する。

                // サイクル検出とメモ化を同時に行うためのスタックベースの計算
                // 1に到達するまでの経路を追跡し、重複を避ける
                // ここでは、nが1に到達するまでの「手数」を求めるため、通常の再帰または反復計算で十分。
                // サイクルが発生する場合、それは無限ループになる可能性があるが、この問題の操作はCollatz予想に似ており、1に収束することが期待される。
                
                // サイクル検出とメモ化を組み合わせた反復計算
                // サイクル検出のために、現在のパスを追跡する
                Map<Long, Long> path = new HashMap<>();
                long tempN = n;
                long step = 0;
                boolean cycleDetected = false;
                
                while (tempN != 1 && !memo.containsKey(tempN)) {
                    if (path.containsKey(tempN)) {
                        // サイクル検出。このケースは、1に到達しない（または1に到達する前にサイクルに入ってしまう）場合に発生するが、
                        // この問題の制約（1に到達するまでの手数）を考えると、通常は1に収束すると仮定する。
                        // サイクルに入った場合、その経路は1に到達しないため、計算を打ち切るか、エラーとする。
                        // ただし、問題文は「1に到達するまでの手数を求め」ているため、サイクルは無視し、到達しないと見なす。
                        // ここでは、サイクルに入った場合は、その経路を計算しない（または、その時点で計算を終了する）
                        break; 
                    }
                    
                    path.put(tempN, step);
                    
                    if (tempN % 2 == 0) {
                        tempN = tempN / 2;
                    } else {
                        tempN = 3 * tempN + 1;
                    }
                    step++;
                }

                if (tempN == 1) {
                    // 1に到達した場合、ステップ数を計算し、メモ化する
                    memo.put(n, step);
                    totalCount += step;
                } 
                // 1に到達しなかった場合（サイクル検出など）、何も加算しない（またはエラー処理）
                // 問題の性質上、1に収束すると仮定されるため、ここでは到達しなかった場合は何も加算しない。

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
