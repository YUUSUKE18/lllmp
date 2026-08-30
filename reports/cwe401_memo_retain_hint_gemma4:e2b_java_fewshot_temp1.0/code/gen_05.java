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

        String line;
        while ((line = br.readLine()) != null && !line.trim().isEmpty()) {
            try {
                long n = Long.parseLong(line.trim());
                if (n == 1) {
                    totalCount += 0;
                    continue;
                }

                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 繰り返し操作をシミュレーションし、メモ化を行う
                long currentN = n;
                long steps = 0;
                
                // 1 に到達するまでの手数を計算
                while (currentN != 1) {
                    if (memo.containsKey(currentN)) {
                        // 途中からメモがあれば、その分を加算して終了
                        steps += memo.get(currentN);
                        break;
                    }
                    
                    if (currentN % 2 == 0) {
                        currentN = currentN / 2;
                    } else {
                        // 3n + 1
                        currentN = 3 * currentN + 1;
                    }
                    steps++;
                }

                // 1に到達するまでの手数を計算し、過程でメモを更新
                // 再帰的なメモ化（または反復的なメモ化）を行う
                
                // ここでは、元のnから1に到達するまでのステップを計算し、過程でメモを更新する
                // これは、各クエリ n ごとに計算するのではなく、到達するまでの過程全体をメモ化する方が効率的であるため、
                // より直接的にFIBONACCI-likeな構造を利用して、元のnから1へのパスを再帰的に計算するアプローチを取る。

                // より単純に、各nについて、1へのパスを辿る際にメモを更新する。
                // nが1に到達するまでのステップ数 (この操作は「1へのパス」を求める問題と似ている)
                
                // 1へのパスを求める計算を、再帰とメモ化で実装し直す。
                // ただし、問題は「nが1になるまでの手数を求め、その合計を求める」であり、
                // これはFIBONACCI数列の過程を逆算する問題（または、各nから1へのパスを求める問題）に類似している。
                
                // 以下の実装は、各nに対して1へのパスを計算し、その過程でメモを更新するアプローチを採用する。
                
                // 再度計算を、memoを更新しながら行う
                long stepsForN = 0;
                long tempN = n;
                Map<Long, Long> pathMemo = new HashMap<>();
                pathMemo.put(n, 0L);

                // 1へのパスを求める（今回は、nが1になるまでの操作回数を求める）
                // 求めたいのは「nが1になるまでの操作回数」ではなく、「nから1への操作の総数」ではなく、
                // 「nが1になるまでに必要な操作回数」である。
                
                // 問題文の解釈: nが1になるまでの手数を求める。
                // n=3: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7ステップ)
                // 実際には、操作を繰り返して1になるまでのステップ数を数える。

                long stepsToOne = 0;
                long current = n;
                Map<Long, Long> tempMemo = new HashMap<>(); // 一時的なメモ

                while (current != 1) {
                    if (tempMemo.containsKey(current)) {
                        stepsToOne += tempMemo.get(current);
                        break;
                    }
                    
                    // 実行する操作を記録
                    tempMemo.put(current, 1L); // 現在のステップ数を1とする (これは操作回数)

                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    stepsToOne++;
                }
                
                // 1に到達した後の残りのステップ数を加算
                if (current == 1) {
                    stepsToOne += 0; // 1に到達したときのステップ数は0
                } else {
                    // これは通常発生しないはずだが、安全のため
                    // エラー処理や境界条件の確認
                }
                
                totalCount += stepsToOne;
                
                // 最終的なメモの更新（本質的なメモ化）
                // 毎回計算した結果をメモに追加する
                memo.put(n, stepsToOne);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
