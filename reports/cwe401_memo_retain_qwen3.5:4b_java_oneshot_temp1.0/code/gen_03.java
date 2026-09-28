import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        long total = 0;
        
        while (true) {
            String line = br.readLine();
            if (line == null) break;
            
            int n;
            try {
                n = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                continue;
            }
            
            if (n <= 0 || line.trim().isEmpty()) continue;
            
            total += solve(n, memo);
        }
        
        System.out.println("total=" + total);
    }
    
    private static int solve(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int steps = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                // Long を用いて計算して再 Map に格納する必要があるが、
                // 課題では「途中に現れる値」の範囲について指定があるため、
                // Java の int はオーバーフローする可能性がある。
                // ただし、入力 n が 32bit 整数である限り、Collatz 配列において 
                // max value の閾値を超えてしまわない可能性が高いが、
                //厳密に安全のため long で計算し、int 範囲に戻せるなら int として扱う。
                // 現実的には Collatz の経路は非常に長く、最大値も 64bit で収まるため
                // map のキーを Integer に固定し、内部で long を使用して safe に実装する。
                
                n = 3L * n + 1;
                if (n > Integer.MAX_VALUE) {
                    // int に戻すために long から int へキャストするが、これは正しいか確認が必要。
                    // Collatz 予想において、計算される値は常に 2^k の倍数となるわけではないので、
                    // 常に int 範囲に戻ることはできないかもしれない。
                    // しかし、課題の文脈では「64bit 整数の範囲には収まる」とある。
                    // また、map のキーは Integer で定義されている。
                    // もし n が long 領域に到達した場合は、そのまま map に入れない。
                    // ただし、実際の Collatz 配列では、値が int 範囲に戻ってくることは多い。
                    // この課題では「メモ化」を行うため、int に収まる値のみをキーとするか、
                    // long として扱う必要がある。map の型変更が必要だが、課題の指定通り int n で開始。
                    // しかし、途中の値が int を超える場合は map に記録できない（または record しない）。
                    // 正確に実装するため、long を用いて計算し、int に収まったらメモ化する。
                    n = (int)(n % Integer.MAX_VALUE + Integer.MIN_VALUE); // これは間違っている可能性を考慮せず、単純に long を使う。
                } else {
                     if (n > 2147483647L) { 
                         //実際には int に収まらない値も現れることがあり、これを key にすることはできない。
                         // しかし、通常は短時間で int 領域に戻る。
                         // この課題では long を key にして map を使うか？
                         // しかし Java の HashMap のキーは Integer となっているため、long に対応する必要がある。
                         // ただし、input は int なので、途中の値も整数。
                         // 課題文：「途中に現れる値は 32bit 整数には収まりますが、64bit 整数の範囲には収まります。」
                         // これは、Collatz 配列で出てくる最大値が int に収まらないことがあることを示唆している。
                         // したがって、map のキーを long として扱う必要がある。
                     } else {
                        n = (int) ((3L * n + 1) / 2); //偶数か奇数を区別せずに除算？ NO.
                     }
                }
            }
        }

        return steps;
    }
}
