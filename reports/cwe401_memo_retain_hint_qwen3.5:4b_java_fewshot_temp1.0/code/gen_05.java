import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.Map;
import java.util.HashMap;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Long> memo = new HashMap<>();
        long totalSteps = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            for (String token : line.trim().split("\\s+")) {
                if (token.isEmpty()) continue;
                
                try {
                    // 文字列を Long に変換し、メモ化表に存在するか確認する
                    long n = Long.parseLong(token);
                    
                    while (!memo.containsKey(n)) {
                        long steps = memo.getOrDefault(1L, 0L); // base case を参照
                    
                        if (n % 2 == 0) {
                            n = n / 2;
                        } else {
                            n = 3L * n + 1;
                        }
                        
                        // 計算の手数を足す
                        long currentSteps = steps + 1; // next state の手順数に +1 をして現在の状態の総手数を求める
                    
                        if (!memo.containsKey(n)) {
                            memo.put(n, currentSteps);
                        } else {
                            totalSteps += memo.get(n) - currentSteps + 1; 
                        }
                    }
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        }
        
        System.out.println("total=" + totalSteps);
    }
}
