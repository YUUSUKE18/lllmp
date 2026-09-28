import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.Map;
import java.util.HashMap;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        memo.put(1, 0);
        int total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            for (String part : line.trim().split("\\s+")) {
                if (part.isEmpty()) continue;
                long nVal;
                try {
                    nVal = Long.parseLong(part);
                } catch (NumberFormatException e) {
                    continue;
                }
                
                int n = (int) nVal;
                if (n == 1) {
                    total += memo.get(1);
                    continue;
                }
                
                long steps = solve(n, memo);
                total += (int) steps;
            }
        }
        
        System.out.println("total=" + total);
    }
    
    private static int solve(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int nextN;
        if (n % 2 == 0) {
            nextN = n / 2;
        } else {
            long temp = 3L * n + 1;
            if (temp > Integer.MAX_VALUE) {
                // 64bit で計算し、次に戻ってくる値を int として扱う必要があるが
                // メモキーには int を使うので、実際の int 範囲を超えた場合は
                // 直接ループしている（int がオーバーフローして負数になるまで）
                // しかし仕様は「64bit 整数の範囲には収まる」とあるため、
                // 計算結果を long で扱い、次の値が int 範囲に戻った時点で処理する。
                // ただし、Collatz 問題では int 範囲を超えると負数になることがあり、
                // そのまま continue されるのが一般的である（ただしここでは負数は除く）。
                // しかし、この問題は「32bit 整数には収まりませんが、64bit 整数の範囲には収まります」とあるので、
                // 計算を long で行うが、次の値が int として解釈できるか確認する必要がある。
                // 実際の Collatz 関数は負数になることがあり、その場合はそのまま処理される（負数を除く実装ではない）。
                // しかし、このシナリオでは n が正の整数から始まるので、3n+1 は常に正である。
                // したがって、int に変換して次のステップを実行する。
                // ただし、3n+1 が Integer.MAX_VALUE を超える場合は、そのまま nextN として int へキャストするとオーバーフローし負数になる。
                // そのまま処理しても OK（負数は偶数/奇数の判定で分岐するが、実際には負数は 2 の補数表現になる）。
                // しかし、Collatz 問題では通常「3n+1 が正の整数であること」を前提とする。
                // ここでは long で計算し、その値を int として扱う（オーバーフローは許容される）。
                // ただし、実装上、nextN = (int)(3L*n + 1) とすると、Overflow が起こる可能性がある。
                // しかし、 Collatz 問題の一般的な実装では、この処理をそのまま行う。
                nextN = (int)(3L * n + 1);
            } else {
                nextN = (int)(3L * n + 1);
            }
        }
        
        int steps = 1 + solve(nextN, memo);
        memo.put(n, steps);
        return steps;
    }
}
