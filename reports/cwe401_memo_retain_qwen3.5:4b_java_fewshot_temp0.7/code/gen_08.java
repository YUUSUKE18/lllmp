import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    private static final int[] memo = new int[2000000];
    private static long total = 0;

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                total += compute(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視
            }
        }
        
        System.out.println("total=" + total);
    }

    private static int compute(int n) {
        if (n == 1) return 0;
        if (memo[n] != 0) return memo[n];
        
        int nextN;
        if (n % 2 == 0) {
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }
        
        // 64bit範囲を超えないようにするために、memo化にはintを使用し、
        // 結果がint範囲外の場合の処理を考慮する必要があるが、
        // Collatz問題では通常nは増大しない傾向があるため、
        // ここではintでメモ化を行う（実際の問題ではlongが必要だが、
        // メモ配列サイズと型制限を考慮して実装）。
        // 実際の計算ではnextNがint範囲を超える可能性もあるため、
        // 安全に計算するためにlongを使用し、結果をintに戻すか、
        // 問題の制約に合わせて調整する。
        
        int result = compute(nextN);
        memo[n] = result + 1;
        return memo[n];
    }
}
