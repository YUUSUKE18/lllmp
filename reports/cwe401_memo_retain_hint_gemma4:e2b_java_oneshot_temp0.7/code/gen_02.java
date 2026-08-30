import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
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
                    // memo.put(n, 0L); // 1 はすでに定義済みだが、ここでは計算結果を格納する
                } else if (!memo.containsKey(n)) {
                    // 再帰的/メモ化再帰で計算
                    long steps = 0;
                    long current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current = current / 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        steps++;
                    }
                    memo.put(n, steps);
                }
                
                // メモがあればそれを使用
                if (memo.containsKey(n)) {
                    totalSteps += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 処理のロジックを再整理し、メモ化をより効果的に使うように修正
        // 各クエリ n について、1 に到達するまでの手数を計算し、合計する

        // 再計算（よりクリーンなメモ化戦略）
        // すでに読み込んだ入力全体を処理し直すか、
        // 読み込み時に都度計算とメモ化を行う形が適切。
        // 今回は標準入力がクエリの羅列であるため、読み込んだもの全てに対して計算を行います。

        // 読み込みループを修正し、各入力値に対して計算と合計を行う
        
        // 再度、すべての入力を処理し、結果を合計する
        // 読み込み時に計算と合計を同時に行うため、上記のループ構造を修正して、
        // 読み込んだ値がクエリであることを前提とします。
        
        // 既存のループで計算と合計を同時に行う場合:
        // totalSteps は、読み込んだ各数 n に対して、nが1になるまでの手数を計算し、合計する必要があります。
        
        // 修正後の実装では、ループ内で計算と合計を同時に行っています。
        // 読み込んだ値 n に対して、もし計算結果がメモに存在しなければ計算し、
        // その結果を合計に加算します。
        
        System.out.println("total=" + totalSteps);
    }
}
