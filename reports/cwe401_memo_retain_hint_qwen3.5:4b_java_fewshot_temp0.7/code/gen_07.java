import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    private static final long[] memo = new long[200000];
    private static boolean[] visited = new boolean[200000];

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int total = 0;

        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                long n = Long.parseLong(line.trim());
                long steps = solve(n);
                total += steps;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("total=" + total);
    }

    private static long solve(long n) {
        if (n == 1) return 0;
        if (visited[(int)n]) {
            return memo[(int)n];
        }
        long steps = 0;
        int nextN;
        if (n % 2 == 0) {
            nextN = n / 2;
        } else {
            // 3n+1 の計算結果が int 範囲を超えないかチェックする必要がある
            // しかし、 Collatz 数列では最初の大きな値は有限であることが知られている
            // 64bit integer で計算するため long を使用する
            nextN = n * 3 + 1;
        }

        if (nextN < Integer.MAX_VALUE && nextN >= 0) {
            steps += solve((long)nextN);
            memo[(int)n] = steps;
            visited[(int)n] = true;
        } else {
            // 3n+1 が int 範囲を超えた場合、直接再帰するのではなく
            // そのまま計算を続ける必要がある。ただし、問題文では
            // "途中に現れる値は 64bit integer の範囲には収まります" とあるので
            // long で計算し続けて OK。

            // しかし、Collatz 数列の最大値が int 範囲を超えることは稀であるが、
            // 厳密に処理するため nextN が int 配列のインデックスとして使えない場合は
            // その値をそのまま追跡する必要がある。
            // ただし、memo 化は int 範囲のみで行う（問題の制約から）

            // ここでは、nextN が int 範囲を超えた場合、その値を直接再帰し、
            // memo 化はしない（または別の仕組みが必要）。
            // しかし、 Collatz において int 範囲を超える値が現れると、
            // その後の値も long で扱われる。

            // 実際には、Collatz の最大値は 2^63 を超えないことが知られている。
            // そのような場合、その大きな値を直接追跡し、
            // memo 化は int 範囲のみで行う。

            steps += solve(nextN);
        }

        return steps;
    }
}
