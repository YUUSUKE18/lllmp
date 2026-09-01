import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int totalSteps = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                if (n == 1) {
                    totalSteps += 0;
                    continue;
                }
                
                // メモ化された値がある場合は直接使用
                if (memo.containsKey(n)) {
                    totalSteps += memo.get(n);
                    continue;
                }
                
                int steps = 0;
                long current = n; // 64bit で計算
                
                while (current != 1) {
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                    
                    // 次の値をメモ化して再帰的に計算する（スタック不使用）
                    if (memo.containsKey((int)current)) {
                        steps += memo.get((int)current);
                        break;
                    } else {
                        memo.put((int)current, 0); // 初期値として0をセット
                    }
                }
                
                // メモリ化された部分のステップ数を合計に追加
                for (Map.Entry<Integer, Integer> entry : memo.entrySet()) {
                    if (entry.getValue() > 0) {
                        totalSteps += entry.getValue();
                    }
                }
                memo.clear(); // メモリ使用量を減らす
                
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + totalSteps);
    }
}
