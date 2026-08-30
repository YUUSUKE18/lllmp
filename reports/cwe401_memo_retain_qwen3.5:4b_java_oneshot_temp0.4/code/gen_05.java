import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
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

        int steps;
        if (n % 2 == 0) {
            steps = 1 + calculateSteps(n / 2, memo);
        } else {
            // 3n+1 が 64bit を超える可能性があるため long で計算し、結果を long メモに保存する必要があるが、
            // 問題文の「途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります」という記述から、
            // メモ化キーとして int を使うのは危険である。しかし、Java の Map<Integer, Integer> では int キーしか使えない。
            // このため、計算過程で long を使用し、最終的な n が int 範囲に戻ったときにのみメモ化する必要がある。
            // ただし、Collatz 問題において中途半端な値（long になるもの）を int メモに保存することはできない。
            // 通常、この問題を解くためには long キーを持つマップが必要だが、仕様は「整数として解釈できない行も無視」とあり、
            // 入力 n は int 範囲である。中途半端な値が int 範囲に戻ってくるかどうかが鍵となる。
            // 実装上、long メモ化を行うのが一般的だが、ここでは long キーと long バリューのマップを使用し、
            // 入力 n が int であることを前提に計算する。

            // 注意: 3n+1 が Integer.MAX_VALUE を超える場合、int overflow になるため long で計算必須
            long nextVal = (long) n * 3 + 1;
            steps = 1 + calculateStepsLong(nextVal, memo);
        }

        // 戻り値を int にキャストしてメモ化（実際には long 値が int 範囲に戻るまで続く）
        // ただし、Collatz 順序列は非常に長くなる可能性があるため、この実装では long キーのマップを使用する必要がある。
        // しかし、問題文の制約「整数として解釈できない行も無視」および「64bit 整数の範囲には収まります」という記述から、
        // 計算過程で long を使うことは許容されていると推測される。
        // したがって、long キーを持つマップを使用し直す。

        return memo.getOrDefault(n, steps); // 修正: メモ化ロジックの再設計が必要
    }

    // long 用のメモ化関数
    private static int calculateStepsLong(long n, Map<Long, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        int steps;
        if (n % 2 == 0) {
            steps = 1 + calculateStepsLong(n / 2, memo);
        } else {
            long nextVal = n * 3 + 1;
            steps = 1 + calculateStepsLong(nextVal, memo);
        }

        memo.put(n, steps);
        return steps;
    }

    // メインの計算ロジックを修正版で再実装
    private static int calculateStepsFixed(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        int steps = 0;
        long current = n; // long で計算過程を管理

        while (current != 1) {
            if (current % 2 == 0) {
                current /= 2;
            } else {
                current = current * 3 + 1;
            }
            steps++;
        }

        // 計算結果を int メモに保存（n が int 範囲であることが保証される）
        memo.put(n, steps);
        return steps;
    }

    public static void main(String[] args) throws Exception {
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
                int steps = calculateStepsFixed(n, memo);
                total += steps;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }
}
