import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line;
        long totalSteps = 0;

        while ((line = reader.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            try {
                int n = Integer.parseInt(line.trim());
                
                if (!memo.containsKey(n)) {
                    memo.put(n, calculateSteps(n));
                }
                totalSteps += memo.get(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static int calculateSteps(int n) {
        if (n == 1) {
            return 0;
        }
        
        long value = BigInteger.valueOf(n).longValue(); // 初期値を int の範囲内として扱うが、計算中はBigIntegerを使用
        // 実装の修正: 32bitを超えうるため、内部は int を使わずに処理し、結果のみ整数化
        // しかし、仕様では "64bit 整数の範囲には収まる" とある。
        // Java の long は 64bit  unsigned ではなく signed。
        // Collatz 問題は n > 1.7 * 10^8 程度で計算した場合に long を超えることがありうるが、
        // この問題の文脈 "途中に現れる値は ... 64bit 整数の範囲には収まります" とあるので、
        // BigInteger で安全に処理し、ステップ数を数えるのが最も確実。
        
        // ステップ計算ロジック
        int steps = 0;
        BigInteger currentVal = BigInteger.valueOf(n);
        
        while (!currentVal.equals(BigInteger.ONE)) {
            if (currentVal.remainder(BigInteger.valueOf(2)).equals(BigInteger.ZERO)) {
                // 偶数
                currentVal = currentVal.divide(BigInteger.valueOf(2));
            } else {
                // 奇数
                currentVal = currentVal.add(currentVal.multiply(BigInteger.valueOf(3)));
            }
            steps++;
        }
        
        return steps;
    }
}
