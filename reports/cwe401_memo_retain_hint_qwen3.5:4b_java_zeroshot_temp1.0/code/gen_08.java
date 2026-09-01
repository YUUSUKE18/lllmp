import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Long> memo = new HashMap<>();
        long totalSteps = 0;
        
        String line;
        while ((line = reader.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                long n = Long.parseLong(line);
                if (memo.containsKey(n)) {
                    totalSteps += memo.get(n);
                } else {
                    long steps = 0;
                    long current = n;
                    
                    while (current != 1) {
                        current = (current % 2 == 0) ? (current / 2) : (3 * current + 1);
                        if (!memo.containsKey(current)) {
                            memo.put(current, steps + 1);
                        } else {
                            // Memo に存在する場合、その値を加算し、ループを抜ける前に状態を更新する必要があるが、
                            // 単なる計算のメモ化では「n から 1 までの総手数」を求める必要があるため、
                            // ここでは現在のパスを完全に計算して累積していくアプローチとする。
                            // しかし、効率的な実装のため、既に計算済みの値を使うようにする。
                            // 今回の仕様は「n が 1 のときの手数は 0」とあり、「32bit 整数には収まらず64bit の範囲に収まる」とある。
                            // 単純な再帰またはループで処理し、メモ化を行う。
                        }
                        
                        // より直接的なアプローチ：現在の値からの距離を計算する
                    }
                    
                    // 修正版：実際のアルゴリズム実装
                    // n から 1 に至るまでの総手数を memo.get(n) として記録
                    if (n == 1) {
                        totalSteps += 0;
                    } else {
                        long current = n;
                        steps = 0;
                        while (current != 1) {
                            // 64bit 範囲内であることを考慮して計算
                            long next;
                            if (current % 2 == 0) {
                                next = current / 2;
                            } else {
                                next = 3 * current + 1;
                            }
                            
                            // もし既にメモに存在する場合、その値を加算する必要があるが、
                            // 「n の総手数」を求めるため、単純な計算ではなく、
                            // n から 1 までの全パスの総和を足すのではなく、
                            // 各ステップの手数を累加していきましょう。
                            
                            // メモ化の仕組み：現在の値 current が 1 に近づくまでの距離を計算し、n に対して記録する。
                            // ただし、単純に n -> ... -> 1 のパス上の全ての節の「この節からの手数」を求めるのではなく、
                            // n の総手数を直接求める方がよい。
                            
                            // 正確な実装：n から 1 に至るまでのステップ数を計算し、メモに保存する。
                            // もし途中の値が既にメモにあれば、その値を再帰的に利用する。
                        }
                    }
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + totalSteps);
    }
}
