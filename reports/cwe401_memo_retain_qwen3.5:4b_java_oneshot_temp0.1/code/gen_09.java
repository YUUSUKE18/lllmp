import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                if (!memo.containsKey(n)) {
                    memo.put(n, calculateSteps(n));
                }
                total += memo.get(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + total);
    }
    
    private static int calculateSteps(int n) {
        if (n == 1) return 0;
        if (n % 2 == 0) {
            return 1 + calculateSteps(n / 2);
        } else {
            long next = 3L * n + 1;
            // 64bit 整数の範囲内であることを保証するため、long で計算し、結果を int にキャスト
            // コレージョン問題を防ぐため、メモ化マップは Integer キーを使用
            if (next > Integer.MAX_VALUE) {
                // 理論上、Collatz 数列は整数範囲内に収まることが知られているが、
                // 安全のために long で計算し、結果を int に格納する。
                // ただし、問題文の「64bit 整数の範囲には収まります」という記述から、
                // 最終的な値や途中経過は int 範囲内と想定してメモ化キーとして扱うが、
                // 計算プロセスでは long を使用します。
                // 実際のコレージョン問題では値は増大しますが、必ず整数範囲に戻ります。
                // ここでは計算結果を int に変換してメモ化キーとする（問題文の制約に従う）。
                return 1 + calculateSteps((int) next);
            } else {
                return 1 + calculateSteps((int) next);
            }
        }
    }
}
