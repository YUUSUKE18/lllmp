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
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(trimmedLine);

                if (n == 1) {
                    // 1 に到達するまでの手数は 0
                    // memo.put(n, 0L); // 1は特殊なのでメモ化は省略または0とする
                } else if (!memo.containsKey(n)) {
                    // 再帰的または動的計画法で計算
                    long steps;
                    if (n % 2 == 0) {
                        steps = 1 + memo.getOrDefault(n / 2, -1);
                    } else {
                        steps = 1 + memo.getOrDefault(3 * n + 1, -1);
                    }
                    
                    // ここで再帰的に呼び出すのではなく、到達までの手数を求める問題なので、
                    // 1までの到達を計算するのではなく、nから1への経路を数える必要があります。
                    // 問題文の意図は「nが1になるまでの操作の回数」を求めることと解釈します。
                    // したがって、nから1への操作を反復的に計算します。
                    
                    // 厳密には、nが1になるまでの手順を数えるため、再帰/メモ化で「nから1への最短経路」を求めるべきです。
                    // 状態: n
                    // 遷移: n -> n/2 (n偶数), n -> 3n+1 (n奇数)
                    
                    // 1に到達するまでの手数を求めるため、nから1への逆方向を考えるのは複雑です。
                    // nから1への操作をシミュレーションし、その回数を数えます。
                    
                    // 別の解釈：nが1になるまでの操作の回数を求める。
                    // n=1 -> 0回
                    // n=2 -> 2/2 = 1 -> 3*1+1 = 4 -> 4/2 = 2 -> 1 (3回)
                    // n=3 -> 3*3+1 = 10 -> 10/2 = 5 -> 3*5+1 = 16 -> 16/2 = 8 -> 8/2 = 4 -> 4/2 = 2 -> 2/2 = 1 (7回)
                    
                    // したがって、nが1になるまでの手数を求めるため、再帰的に計算し、メモ化します。
                    
                    // nが1より大きい場合、n自身が1になるまでの手数を求める。
                    // 1に到達するまでの手数を求めるため、nから1への過程をシミュレーションする。
                    
                    // ここでは、nから1への操作の回数を求めるという一般的な「コナーの問題」の解法を適用します。
                    // 1に到達するまでの手数を求めるため、nが1になるまでの操作回数を計算します。
                    
                    long currentN = n;
                    long steps = 0;
                    while (currentN != 1) {
                        if (currentN % 2 == 0) {
                            currentN /= 2;
                        } else {
                            currentN = 3 * currentN + 1;
                        }
                        steps++;
                    }
                    
                    memo.put(n, steps);
                    totalSteps += steps;

                } else {
                    // メモがあればその値を加算
                    totalSteps += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }
}
