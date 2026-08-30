import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            
            try {
                long n = Long.parseLong(line.trim());
                
                // メモ化された値があるか確認
                if (memo.containsKey((int) n)) {
                    total += memo.get((int) n);
                    continue;
                }
                
                int count = 0;
                long current = n;
                
                // Collatz 問題を計算
                while (current != 1) {
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    count++;
                    
                    // メモ化テーブルへの追加（値が int の範囲内であれば）
                    if (current >= 0 && current <= Integer.MAX_VALUE) {
                        if (!memo.containsKey((int) current)) {
                            memo.put((int) current, count + solveCollatz(int current));
                        }
                    }
                }
                
                // メモ化テーブルへの追加（n の計算結果を格納）
                int finalVal = (int) current;
                memo.put((int) n, count);
                total += count;
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + total);
    }

    private static int solveCollatz(int n) {
        int count = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                n = 3 * n + 1;
            }
            count++;
        }
        return count;
    }
}
