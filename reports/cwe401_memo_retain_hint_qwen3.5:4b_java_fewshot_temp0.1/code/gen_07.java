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
                if (n == 1) {
                    total += memo.get(1);
                } else {
                    int steps = calculateSteps(n, memo);
                    total += steps;
                    memo.put(n, steps);
                }
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
                // ただし、問題文は「途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります」と述べている。
                // メモキーとして int を使うが、計算過程で long が必要になる可能性がある。
                // しかし、Collatz 問題において、int の範囲から始まっても、long 範囲を超えないことは一般的ではないが、
                // 厳密に「64bit 整数の範囲には収まります」とあるので、計算時は long を使うべきか？
                // メモキーは int なので、int 値を key にする。
                // 計算時に n が int の上限を超えそうなら long として扱うが、最終的に 1 に戻るまで。
                // ただし、問題文の「途中に現れる値」は int 範囲を超える可能性があるため、
                // 計算ロジックでは long を使用し、結果を int メモに保存する必要があるか？
                // しかし、Collatz シークエンスにおいて、int の範囲から始まっても、long 範囲を超えないことは限らないが、
                // 実際には超えるケースは非常に稀であり、かつ問題文は「64bit 整数の範囲には収まります」と保証している。
                // したがって、計算時は long を使用し、結果を int メモに保存する。
                
                n = 3L * n + 1;
            }
            steps++;
        }
        
        memo.put(n, steps);
        return steps;
    }
}
