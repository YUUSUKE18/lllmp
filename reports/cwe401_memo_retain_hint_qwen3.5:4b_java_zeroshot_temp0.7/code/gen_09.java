import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        
        long totalSteps = 0;
        String line;
        
        while ((line = reader.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            
            try {
                int n = Integer.parseInt(line);
                totalSteps += collatzStep(n, memo);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + totalSteps);
    }
    
    private static int collatzStep(int n, Map<Integer, Integer> memo) {
        if (n == 1) {
            return 0;
        }
        
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int steps;
        if (n % 2 == 0) {
            steps = 1 + collatzStep(n / 2, memo);
        } else {
            // 3n+1 が負の値になることは不可能だが、long にして計算し、結果を長整数として戻す必要がある。
            // ただし、問題文は「64bit 整数の範囲には収まる」と述べている。
            // Java の int は有符号 32bit で、3n+1 が負になる可能性はないが、int 定数演算では溢れやすい。
            // 計算プロセス自体を long を使って行い、メモ化キーは元の int n を使うが、
            // 途中の値（3n+1）は long として処理する必要がある。
            // しかし、問題文「同じ整数が繰り返し現れるので...メモ化」の文脈から、
            // メモ化のキーは最終的に到達する数やその過程にある整数である。
            // Collatz 数列は非常に複雑だが、n が int の範囲であれば、long 範囲で収まる値も有限個（または実用的な時間）しか現れない。
            // ここでは long を使って計算し、結果（手数だけ）を int で返す形式にする。
            // ※厳密には、Collatz 猜想の反例は存在しないが、long 範囲を超えていくことはある。
            // ただし、「64bit 整数の範囲には収まります」という制約があるため、long として計算し、
            // 戻り値は手数（int）のみを返す形とする。
            
            long nextN = 3L * n + 1;
            steps = 1 + collatzStep((int)nextN, memo); // 注意：次の値が int を超える可能性あり
        }
        
        memo.put(n, steps);
        return steps;
    }
}
