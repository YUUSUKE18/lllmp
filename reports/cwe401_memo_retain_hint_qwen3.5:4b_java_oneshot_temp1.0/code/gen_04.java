import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

public class Main {
    private static final Map<Integer, Long> memo = new HashMap<>();

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;

        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line);
                long steps = calculateSteps(n);
                totalSteps += steps;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static long calculateSteps(int n) {
        if (n == 1) {
            return 0;
        }
        
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long steps = 0;
        int nextVal = (n % 2 == 0) ? n / 2 : 3 * n + 1;

        // 次の値が 64bit 整数を超えない範囲で計算する必要があるが、問題文によると「途中に現れる値は 64bit 整数の範囲には収まる」とある
        // Java の long は 64bit を持つ。しかし、3n+1 が Integer.MAX_VALUE より大きく也成为する可能性がある（Collatz 数列の特徴）
        // 例：n = 20, nextVal = 60; n = 1000000000 (Integer.MAX_VALUE), nextVal = 3000000003 + 1 -> long に昇格させる必要があるか？
        // Integer.MAX_VALUE 付近で 3n+1 が負の値になる可能性があるが、実際の Collatz 計算では long で計算するのが安全である。
        // ただし、入力は int として読むが、内部計算では long を使うのが適切。

        // n が巨大な場合、nextVal は Integer.MAX_VALUE を超えることがある（例：n = 3,000,000,003 は int に収まらないが問題文は入力 n が int とする）
        // 問題文:「途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります。」
        // よって、計算プロセスを long で行う。

        long current = n;
        while (current != 1) {
            long nextVal = (current % 2 == 0) ? (current / 2) : (3 * current + 1);
            if (nextVal < 0) {
                // 負の値にならないように、または Overflow を防ぐためのロジックだが、Collatz 公式では通常正値になる。
                // Java の long 演算は飽和ではない（2^63-1, -2^63 が最大最小）
                // ただし、3*current+1 が負のオーバーフローを起こす可能性が理論上あるが、実用的な Collatz 数列ではそのような値は現れにくい。
                // 安全のため long を使えば良い。
            }
            current = nextVal;
            steps++;
        }

        memo.put(n, steps);
        return steps;
    }
}
