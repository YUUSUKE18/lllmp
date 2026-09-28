import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            try {
                long n = Long.parseLong(line.trim());
                if (n == 1) {
                    total += 0;
                    continue;
                }

                if (memo.containsKey(n)) {
                    total += memo.get(n);
                    continue;
                }

                // 計算ロジック
                long count = 0;
                long current = n;
                
                // 3n+1問題（コナーの定理を計算する過程）
                while (current != 1) {
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    count++;
                }

                // メモ化と合計の更新
                memo.put(n, count);
                total += count;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }
}
