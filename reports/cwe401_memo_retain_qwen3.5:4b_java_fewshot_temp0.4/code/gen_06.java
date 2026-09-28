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
        int total = 0;
        
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
                // long 型で計算して、結果を memo に保存するためにもう一度 int として扱う必要があるが
                // 問題文の「64bit 整数の範囲には収まります」という記述から
                // 中間値は long で扱い、最終的に 1 に到達するまでの回数を数える。
                // ただし、memo のキーは int なので、int 範囲を超えない値をキーにするか、
                // 問題文の意図を「計算結果（次の値）が 32bit 整数には収まらず 64bit で必要」と解釈し、
                // memo は int キーのみで管理し、途中経過は long で計算する。
                // しかし、Collatz 数列は int 範囲から入れば必ず int 範囲（または少し超えるが通常は戻ってくる）に戻る。
                // 安全のために long 変数を使用し、1 に到達するまでの回数を数える。
                n = 3L * n + 1;
            }
            steps++;
        }
        
        memo.put(n, steps);
        return steps;
    }
}
