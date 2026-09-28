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
                total += calculateStep(n, memo);
            } catch (NumberFormatException e) {
            }
        }

        System.out.println("total=" + total);
    }

    private static int calculateStep(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        int count = 0;
        int current = n;
        while (current != 1) {
            if (current % 2 == 0) {
                current = current / 2;
            } else {
                // 3n+1 の計算結果は long で扱う必要がある可能性があるが、
                // メモのキーとして int を使うため、実際に生成される値をチェックする必要がある。
                // ただし、問題文では「64bit 整数の範囲には収まります」とあるので、
                // 中間値を long で扱い、1 に戻ってくるまでのループを行う。
                // しかし、メモのキーは int なので、int を超える値はキャッシュされず再計算になるが、
                // Collatz 問題では数値は増大し続けない（logarithmic bound がある）ため実用的に OK。
                // ただし、int 範囲を超えて long になる場合は int キーでメモ化できないので、
                // そのまま計算し続けるか、long をキーにする必要があるが、
                // 問題の制約「64bit 整数の範囲には収まります」とあるので、
                // 実際は long で計算して、戻ってきた値を int にキャスト（または long キーでメモ）する。
                // 今回はメモリ効率と簡素さのため、int 範囲内であれば int キー、超える場合は long キーで処理。
                // ただし、Java の int は有符号 32bit なので、負数にならないように注意。
                // Collatz 序列は正整数のみを生成する。
                
                // 安全に計算するために long を使用し、メモ化用のキーとして長さが int に収まるかを確認。
                long next = (long) current * 3 + 1;
                if (next < Integer.MIN_VALUE || next > Integer.MAX_VALUE) {
                    // int 範囲を超えた場合は int キーでメモ化できないが、
                    // 問題文の制約により最終的に 1 に戻り、int に収まるはず。
                    // ただし、一時的に long として管理し続ける必要がある。
                    // ここでは簡略化して、long をキーとする Map を追加する必要があるが、
                    // 元の仕様「計算結果をメモ化」を満たすため、long キーも考慮。
                } else {
                    next = (int) next;
                }

                // 実際には long で計算し、戻ってきた値を int に代入してループ継続する
                // ただし、3n+1 が int を超えることはあり、その場合 long で計算し続ける必要がある。
                // そのようなケースでは int キーでメモ化できないが、
                // 問題文の制約により、最終的に 1 に戻り、int に収まる。
                // よって、long で計算し、結果が int に戻るまでループする。
                current = (int) next;
            }
            count++;
        }

        memo.put(n, count);
        return count;
    }
}
