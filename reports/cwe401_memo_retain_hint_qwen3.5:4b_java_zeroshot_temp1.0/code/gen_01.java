import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line;
        
        while ((line = reader.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            int n;
            try {
                n = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                continue;
            }
            
            int steps = calculateSteps(n);
            System.out.println("total=" + steps);
        }
    }

    private static int calculateSteps(int n) {
        if (n == 1) {
            return 0;
        }
        
        // 既に計算済みの値があれば直接使用
        return memo.getOrDefault(n, -1);
    }
    
    // メモライス関数と計算ロジックを統合した再実装（実装要件を満たすため）
    private static int computeAndMemoize(int n) {
        if (n == 1) {
            return 0;
        }
        
        int result = -1;
        if (memo.containsKey(n)) {
            result = memo.get(n);
        } else {
            // 操作を適用して次回の計算へ移行
            int nextN = (n % 2 == 0) ? n / 2 : 3 * n + 1;
            
            // 再帰呼び出し（メモ化なしの状態の再帰でも OK，ただしキャッシュ済みなので効率的）
            // ただし、問題文の「計算結果をメモ化して高速化」のため、
            // 次の段階も同様に処理して結果を得る。
            int subSteps = computeAndMemoize(nextN);
            result = 1 + subSteps;
        }
        
        memo.put(n, result);
        return result;
    }

    public static void mainRevised(String[] args) throws IOException {
        // 読み込みと処理を統合したバージョン
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line;
        long totalSteps = 0;

        while ((line = reader.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            int n;
            try {
                n = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                continue;
            }

            int steps = computeAndMemoize(n);
            totalSteps += steps;
        }

        System.out.println("total=" + totalSteps);
    }
}
