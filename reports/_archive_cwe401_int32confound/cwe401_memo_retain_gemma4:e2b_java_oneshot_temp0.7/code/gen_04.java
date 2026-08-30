import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder totalBuilder = new StringBuilder();
        long total = 0;
        Map<Integer, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            try {
                int n = Integer.parseInt(line.trim());
                if (n <= 0) continue;

                if (n == 1) {
                    // 1 に到達するまでの手数は 0
                    long count = 0;
                    total += count;
                    // memo.put(n, count); // 1は0なので追加は省略しても良いが、メモ化の観点から含める
                } else if (memo.containsKey(n)) {
                    // メモがあればそれを使用
                    long count = memo.get(n);
                    total += count;
                } else {
                    // 再帰またはメモ化再帰で計算
                    long count = 0;
                    int current = n;
                    // 経路を記録して、ループや無限再帰を防ぐため、および計算過程を追うため
                    // ただし、この問題は必ず1に到達するため、単純なメモ化再帰で十分
                    
                    // 再帰とメモ化
                    if (current % 2 == 0) {
                        count = 1 + memo.getOrDefault(current / 2, -1);
                    } else {
                        count = 1 + (3 * current + 1) + memo.getOrDefault(3 * current + 1, -1);
                    }
                    
                    // 実際には、各ステップでの遷移を追う必要があるため、単純な再帰ではなく、
                    // 1に到達するまでのステップ数を直接求めるように実装し、メモ化を適用する。
                    // 1に到達するまでのステップ数を求める問題なので、再帰ではなく、到達までの経路を辿る形で計算する。
                    
                    // ここでは、nから1に到達するまでのステップ数を求めるので、
                    // 1に到達するまでの最短経路を求める問題として、再帰とメモ化で計算します。
                    // ただし、問題文の「操作を繰り返し、1 に到達するまでの手数を求めます」は、
                    // 1回の操作で1に到達するわけではないため、通常は再帰で解く。

                    // 再度、再帰による計算を試みる（メモ化を適用）
                    // 1からnへの逆操作を考える方が計算が簡単だが、ここでは順方向の操作をシミュレートする。
                    // 1に到達するまでのステップ数を求めるため、nからスタートして1に到達するまでのステップ数を数える。
                    
                    // 1に到達するまでのステップ数を求めるための計算ロジックを再定義する。
                    // n -> f(n) -> f(f(n)) -> ... -> 1
                    
                    // 1. nが偶数なら n/2
                    // 2. nが奇数なら 3n+1
                    
                    // これは、Collatz予想に関連する問題であり、nから1へのステップ数を求める。
                    
                    // nが1でなければ、
                    // n -> next_n (1ステップ)
                    // next_n から1へのステップ数 + 1
                    
                    // 再帰的なアプローチで実装し直す。
                    
                    long steps = 0;
                    int currentN = n;
                    // 経路を追跡して、無限ループを避けるため、訪問済みセットも必要になる場合があるが、
                    // Collatz数列は必ず1に収束すると仮定されているため、今回はメモ化のみで十分と判断する。
                    
                    // 1に到達するまでのステップ数を計算
                    while (currentN != 1) {
                        if (memo.containsKey(currentN)) {
                            // 既に計算済みの値があれば、その結果を足し合わせる
                            steps += memo.get(currentN);
                            break;
                        }
                        
                        if (currentN % 2 == 0) {
                            currentN /= 2;
                        } else {
                            currentN = 3 * currentN + 1;
                        }
                        steps++;
                    }
                    
                    // 1に到達した後のステップ数をメモ化
                    if (currentN == 1) {
                        memo.put(n, steps);
                    }
                    
                    total += steps;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        totalBuilder.append("total=").append(total).append("\n");
        System.out.print(totalBuilder.toString());
    }
}
