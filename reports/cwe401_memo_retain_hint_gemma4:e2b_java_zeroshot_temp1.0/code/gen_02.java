import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while (true) {
            line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // 1に到達するまでの手数は0
                    // 実際には、このnが他のクエリの結果として使われる可能性があるため、メモ化はn自体をキーとして扱う
                    // ただし、ここではクエリごとに計算し、その結果を合計する
                    // n=1 の場合は手数は0
                    // memo.put(n, 0L); // このロジックは後述の計算処理に組み込むため、ここでは一旦スキップ
                } else if (!memo.containsKey(n)) {
                    long steps = 0;
                    long current = n;
                    
                    // 1に到達するまでの手数を計算
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        steps++;
                    }
                    
                    memo.put(n, steps);
                }
                
                totalCount += memo.get(n);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("total=" + totalCount);
    }
}
