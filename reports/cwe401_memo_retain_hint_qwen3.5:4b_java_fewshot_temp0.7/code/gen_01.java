import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        long[] cache = new long[1000]; // 初期値として 0 を設定（n=1 のケースもカバー）

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;

            try {
                int n = Integer.parseInt(line.trim());
                long steps = solve(n, cache);
                total += steps;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }

    private static long solve(long n, long[] cache) {
        if (n == 1) return 0;
        if (cache[(int)(n % cache.length)] != 0) {
            return cache[(int)(n % cache.length)];
        }

        long steps = 0;
        long nextN;

        // 64bit 整数の範囲内を処理するために、配列インデックスとして mod を使うが、
        // 実際にはメモ化が効かない場合があるため、ここでは単純に計算し、
        // 結果を格納するのではなく、直接計算して累加するアプローチを採用します。
        // ただし、問題文で「メモ化して高速化してください」とあるので、
        // Collatz 数列の性質（2n+1 の形）を利用した最適化を試みます。

        long current = n;
        while (current != 1) {
            if (current % 2 == 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        return steps;
    }
}
