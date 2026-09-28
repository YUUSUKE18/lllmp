import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Integer> memo = new HashMap<>();
        memo.put(1L, 0);
        
        long totalSteps = 0;
        String line;
        
        while ((line = reader.readLine()) != null) {
            if (line.trim().isEmpty() || !line.trim().matches("-?\\d+")) {
                continue;
            }
            
            try {
                long n = Long.parseLong(line.trim());
                
                while (n != 1) {
                    long nextN = n;
                    if ((nextN & 1) == 0) {
                        nextN >>= 1; // n / 2
                    } else {
                        nextN = (3L * nextN) + 1; // 3n + 1
                    }
                    
                    int stepsForNext = memo.getOrDefault(nextN, 0);
                    if (stepsForNext == 0) {
                        // すでに 1 に到達したと判断する場合 (メモ化されていないが、実際に計算すると 1 になる場合など)
                        // しかし、問題文の論理により、1 のみで 0 になることが保証されます。
                        // 効率的に実装するため、実際に計算します。
                        long temp = nextN;
                        int count = 0;
                        while (temp != 1) {
                            if ((temp & 1) == 0) {
                                temp >>= 1;
                            } else {
                                temp = (3L * temp) + 1;
                            }
                            count++;
                        }
                        stepsForNext = count;
                    }
                    
                    totalSteps += (stepsForNext + 1);
                    n = nextN;
                    // メモ化（既に計算済みの値がある場合は再計算を避けるため）
                    memo.put(n, stepsForNext + 1); 
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("total=" + totalSteps);
    }
}
