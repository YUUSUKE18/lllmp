import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Long> memo = new HashMap<>();
        long totalSteps = 0;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // nが1のときの手数は0
                    // memo.put(1L, 0L); // 1はベースケースとして扱われるが、今回はクエリごとに計算するためスキップ
                    continue;
                }

                // メモ化された結果があればそれを使用
                if (memo.containsKey(n)) {
                    totalSteps += memo.get(n);
                    continue;
                }

                // 再帰または反復計算で手数を求める（メモ化再帰/動的計画法）
                // ここでは、現在のnから1に到達するまでのステップ数を直接計算する
                // 1に到達するまでの手数を求める問題なので、nから開始して1に到達するまでのステップ数を数える
                
                long current = n;
                long steps = 0;
                
                // 1に到達するまでのステップを計算
                while (current != 1) {
                    if (current % 2 == 0) {
                        current /= 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                    
                    // メモ化の更新（経路に沿って）
                    // ただし、これは「nから1への経路」ではなく、「nを操作して1に到達する」という単一の過程の手数
                    // 通常、この問題は「特定のnから1に到達するまでのステップ数」を求めるため、nが与えられたときの計算結果をメモ化します。
                }
                
                // 計算結果をメモ化
                memo.put(n, steps);
                totalSteps += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }
}
