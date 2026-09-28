import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        
        Map<Integer, Integer> memo = new HashMap<>();
        long totalSteps = 0;
        
        while ((line = br.readLine()) != null) {
            try {
                int n = Integer.parseInt(line.trim());
                if (n <= 0 || n == null) continue;
                
                int steps = 0;
                BigInteger current = BigInteger.valueOf(n);
                
                // 1 から始める場合の手数は 0
                while (!current.equals(BigInteger.ONE)) {
                    if (current.equals(BigInteger.ONE)) break;
                    
                    if (current.compareTo(BigInteger.ZERO) >= 0) {
                        int value = current.intValue(); // n の値を取得
                        steps++;
                        if (value % 2 == 0) {
                            current = current.divide(BigInteger.valueOf(2));
                        } else {
                            current = current.multiply(BigInteger.valueOf(3)).add(BigInteger.valueOf(1));
                        }
                    }
                }
                
                // メモ化
                int memoSteps = steps;
                if (!memo.containsKey(n)) {
                    memo.put(n, memoSteps);
                }
                
                // 64bit integer の範囲に収まる場合のみ、メモ化された値を加算する
                // 問題文によると途中の値は BigInteger で管理し、結果が int に収まればメモ化する
                // ただし n が大きいと計算時間が長すぎるため、memo を使って高速化
                totalSteps += memo.get(n);
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + totalSteps);
    }
}
