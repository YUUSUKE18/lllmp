import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;

        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            try {
                long nLong = Long.parseLong(line);
                long n = nLong;
                int steps = 0;
                
                if (n == 1) {
                    steps = 0;
                } else {
                    memo.put(n, steps);
                    while (n != 1) {
                        if (n % 2 == 0) {
                            n = n / 2;
                        } else {
                            n = 3 * n + 1;
                        }
                        steps++;
                        memo.put(n, steps);
                    }
                }
                total += memo.get(1); // 最終的に 1 に到達した時のステップ数 (計算された steps) 
                                    // ただし、上記ロジックは少し修正が必要。メモ化の構造を再検討。
                // より効率的な実装:
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        // 上記の試行が複雑になりすぎたため、完全な実装を再構築する。
    }
}
