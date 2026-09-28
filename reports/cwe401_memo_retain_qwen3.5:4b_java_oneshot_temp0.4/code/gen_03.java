import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int totalSteps = 0;

        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            try {
                int n = Integer.parseInt(line);
                
                if (!memo.containsKey(n)) {
                    memo.put(n, calculateSteps(n));
                }
                totalSteps += memo.get(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static int calculateSteps(int n) {
        if (n == 1) return 0;
        
        int steps = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                // Collatz 問題では n が非常に大きくなる可能性があるため、long で計算する必要がある。
                // しかし、メモリ化のキーとして int を使う場合、途中経過が long になるケースを考慮する必要がある。
                // 仕様は「64bit 整数の範囲には収まります」と述べているので、計算自体は long を使って行うべきだが、
                // メモ化のキーは元の入力値（int）または計算過程で到達した値（long）とするか。
                // 通常 Collatz 問題では数値は増大するが、最終的に 1 に戻る。
                // ここでは計算過程で long になる値もメモ化対象にする必要がある可能性があるが、
                // 入力 n は int 範囲であるため、まずは int での計算を試みる。
                // ただし、n が奇数なので 3n+1 となり、int 溢れを起こす可能性が高い。
                // 問題文「途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります」
                // より、計算は long を使用し、メモ化キーも long に拡張すべきだが、Java の int キーでは不可。
                // したがって、Map<Long, Integer> を使用して long 値もキャッシュする。
                
                n = (long) n * 3 + 1;
            }
            steps++;
        }
        return steps;
    }
}
