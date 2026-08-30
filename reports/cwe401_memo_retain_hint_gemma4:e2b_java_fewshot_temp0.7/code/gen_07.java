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
                    // memo.put(n, 0L); // 1 のケースは特別扱い
                } else if (!memo.containsKey(n)) {
                    // 再帰/動的計画法で計算
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
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // すべてのクエリの手数の合計を計算
        // この問題の仕様は「各クエリ n について...手数を求め、その合計を求める」
        // 入力は1行に1個ずつ並ぶため、読み込んだ各行がクエリに対応します。
        // 読み込んだ行の数（非空の整数）と、その合計を計算します。
        
        // 再計算が必要な場合、memoを使って合計を計算します。
        // 読み込んだ行を再度処理して合計を計算するのではなく、
        // 読み込み時に計算結果を蓄積する方が効率的ですが、
        // 今回は入力全体を読み込み、memoを再利用して合計を出す形にします。
        
        // 再度、入力から合計を計算するロジックを、memoを最大限活用するように修正します。
        // 実際には、入力の各行がクエリであり、その計算結果を合計する必要があります。
        // 上記のループでは、メモ化された値が手数であり、合計を直接計算していません。
        // 再度、入力された各行を処理し、合計を計算します。
        
        // 効率化のため、入力された整数を再読み込み、または入力時に合計を計算します。
        // 今回は、入力の各行がクエリであり、そのクエリごとの手数を合計します。
        
        // 最初のループで、入力された各行がクエリであると仮定し、その結果を合計します。
        // ただし、上記ループでは「nが1に到達するまでの手数」を計算していますが、
        // 求められているのは「nが1に到達するまでの手数」そのものではなく、
        // 「すべてのクエリの手数の合計」です。

        // 修正：入力された各行 n について、計算結果を合計します。
        // 既にmemoに格納されている値が、そのクエリ n から 1 への手数です。

        // 再度、入力された行を処理して合計を計算するロジックを、
        // 読み込んだ行をそのまま使う形で実装します。
        
        // 読み込んだ行を再処理せずに、memoに格納された値の合計を求めます。
        // 実際には、入力ストリーム全体を一度読み込むだけで十分です。

        // 最初のループで、memoに格納されたすべての値（クエリに対応する答え）を合計します。
        for (long n : memo.keySet()) {
            // 1のケースは手数が0なので、memoに入っている値が手数です。
            // n=1 の場合、計算結果は0ですが、memoには n=1 の処理はスキップしたため、
            // 1 の手数は 0 と見なされます。
            if (n == 1) {
                // 1 の手数は 0
            } else {
                totalSteps += memo.get(n);
            }
        }
        
        // 最終的な出力
        System.out.println("total=" + totalSteps);
    }
}
