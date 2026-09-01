import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Long> memo = new HashMap<>();
        long total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            
            try {
                int nVal = Integer.parseInt(line.trim());
                long n = nVal;
                
                // メモ化された結果がある場合はその値を直接使用
                if (memo.containsKey(n)) {
                    total += memo.get(n);
                    continue;
                }
                
                long count = 0;
                long current = n;
                boolean visitedOne = false;
                
                while (current != 1) {
                    if (!visitedOne && memo.containsKey(current)) {
                        count += memo.get(current);
                        visitedOne = true; // 1 に達したことを示すためのフラグ（実際には current==1 でループ終了）
                        break;
                    }
                    
                    long nextVal;
                    if (current % 2 == 0) {
                        nextVal = current / 2;
                    } else {
                        nextVal = 3 * current + 1;
                    }
                    
                    count++;
                    current = nextVal;
                }
                
                // current が 1 になったので、メモに保存（n から 1 までのコストは count）
                if (!memo.containsKey(n)) {
                    memo.put(n, count);
                }
                
                total += count;
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + total);
    }
}
