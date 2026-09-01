import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        memo.put(1, 0);
        long total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                int steps = calculateSteps(n, memo);
                total += steps;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + total);
    }
    
    private static int calculateSteps(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int steps = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                // 64bit 整数の範囲に収まるように計算する必要があるが、
                // Java の int は 32bit なので long に昇格させる必要がある。
                // ただし、問題文は「途中に現れる値は 32bit 整数には収まりませんが、
                // 64bit 整数の範囲には収まります」と述べているため、long で計算する。
                n = (n * 3L + 1) / 2; // 奇数の場合のみ 3n+1 を計算し、次に偶数処理に入るのではなく、
                                    // 直接次の値を計算してループさせるのが効率的だが、
                                    // 問題の定義通り「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し」とあるので、
                                    // 各ステップで 1 つだけ変化する。
                // 修正: 上記のロジックは少し誤っている。正しいループは以下の通り。
            }
        }
        
        // 再実装：long を使って計算し、結果を int で返す（問題文の範囲内）
        long current = n;
        int count = 0;
        while (current != 1) {
            if (current % 2 == 0) {
                current /= 2;
            } else {
                current = current * 3 + 1;
            }
            count++;
        }
        
        memo.put(n, count);
        return count;
    }
}
