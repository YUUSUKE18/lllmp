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

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }
            
            // 空行や数値として解釈できない行を無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());
                
                if (n == 1) {
                    // nが1のときの手数は0
                    totalCount += 0;
                } else if (!memo.containsKey(n)) {
                    long count = 0;
                    long current = n;
                    // メモ化された値に到達したかチェックし、到達していなければ計算開始
                    while (current != 1) {
                        if (memo.containsKey(current)) {
                            // 既に計算済みの値に到達した場合、その差分を加算して終了
                            count += memo.get(current) - memo.get(n);
                            break;
                        }
                        
                        // 繰り返し操作
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        count++;
                    }
                    
                    // 計算結果をメモ化（ただし、この問題は「1に到達するまでの手数」を求めるので、
                    // nから1へのパスの長さを求めるのが一般的。ここではnから1へのパスの長さを求める）
                    // 再帰的または動的計画法で、nから1への最短経路（操作回数）を求める。
                    // ただし、ここでは「nが1になるまでの手数」を求めるので、nから開始して1に到達するまでのステップ数を数える。
                    
                    // 再計算してメモ化する（より単純で安全）
                    long steps = 0;
                    long temp = n;
                    while (temp != 1) {
                        if (temp % 2 == 0) {
                            temp /= 2;
                        } else {
                            temp = 3 * temp + 1;
                        }
                        steps++;
                    }
                    memo.put(n, steps);
                    totalCount += steps;

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
}
