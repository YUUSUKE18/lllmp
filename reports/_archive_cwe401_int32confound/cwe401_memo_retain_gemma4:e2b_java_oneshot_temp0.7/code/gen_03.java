import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        // メモ化のためのマップ
        Map<Long, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }
            
            // 空行は無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());
                
                if (n == 1) {
                    // nが1のときの手数は0
                    // この問題の仕様では、クエリごとに操作を繰り返して1に到達するまでの手数を求めるため、
                    // ここでnがクエリとして与えられた場合、nから1へのパスを計算する。
                    // ただし、問題文の「n が 1 のときの手数は 0 です」は、操作の結果が1になったときのカウントを指すと考えられる。
                    // ここでは、nから1への操作の回数を数える。
                    // n=1の場合は既に1なので、操作回数は0。
                    long count = 0;
                    long current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        count++;
                    }
                    totalCount += count;
                    
                } else if (!memo.containsKey(n)) {
                    // メモ化されていない場合、再帰または動的計画法で計算し、メモ化する
                    // ここでは、nから1への操作回数を求めるため、再帰的に定義する。
                    // しかし、問題文の意図が「nが与えられたときの、nから1への操作回数」であれば、
                    // 以下の計算はnが特定の数であり、その数から1へのパスを求めるという文脈に合致する。
                    // 実際には、この問題はコナーズの予想（3n+1問題）に似ており、通常は入力nから1へのパスを求める。
                    // 
                    // n=1のときの手数は0、という定義に従い、nから1へのパスを計算する。
                    
                    // 再帰的な計算とメモ化
                    long count = calculateSteps(n, memo);
                    totalCount += count;
                } else {
                    // メモ化されている場合
                    totalCount += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * nから1への操作回数を計算し、メモ化する再帰関数。
     * @param n 現在の数
     * @param memo メモ化マップ
     * @return nから1への操作回数
     */
    private static long calculateSteps(long n, Map<Long, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long steps;
        if (n % 2 == 0) {
            // nが偶数なら n/2
            steps = 1 + calculateSteps(n / 2, memo);
        } else {
            // nが奇数なら 3n+1
            steps = 1 + calculateSteps(3 * n + 1, memo);
        }

        memo.put(n, steps);
        return steps;
    }
}
