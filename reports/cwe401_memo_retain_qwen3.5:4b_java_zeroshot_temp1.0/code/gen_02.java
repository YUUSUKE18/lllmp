import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Map;
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int totalSteps = 0;
        
        // TreeMap は自動的にキー（n）をソートするため、メモ化として有効な値を探索する順序を保てる
        Map<Long, Integer> cache = new TreeMap<>();
        
        while ((line = br.readLine()) != null) {
            try {
                long n = Long.parseLong(line.trim());
                
                // 0 や負の数、空行など無視する場合の処理は spec に従い、
                // '1 以上の整数' とあるので、解析が成功すれば ok。
                // ただし、問題文の「整数として解釈できない行も無視します」には注意が必要。
                // Long.parseLong が例外を Throwするので try-catch で囲むのが安全。
                
                if (n <= 0) {
                    continue; 
                }
                
                long current = n;
                int steps = 0;
                
                while (current != 1) {
                    current = calculateNext(current);
                    steps++;
                }
                
                // 結果をメモ化 (キャッシュ) に追加
                cache.put(n, steps);
                
                totalSteps += steps;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }
        
        System.out.println("total=" + totalSteps);
    }

    // n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を実施する
    private static long calculateNext(long n) {
        if (n % 2 == 0) {
            return n / 2;
        } else {
            return 3 * n + 1;
        }
    }
}
