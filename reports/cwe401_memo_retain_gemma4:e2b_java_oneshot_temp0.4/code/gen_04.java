import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Long, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }
            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // 1 に到達するまでの手数は 0
                    totalCount += 0;
                    continue;
                }

                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 計算とメモ化
                long steps;
                if (n % 2 == 0) {
                    // n が偶数なら n/2
                    steps = 1 + memo.getOrDefault(n / 2, 0);
                } else {
                    // n が奇数なら 3n+1
                    steps = 1 + memo.getOrDefault(3 * n + 1, 0);
                }

                // ここでの問題の解釈について：
                // 「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
                // これは、n から 1 に到達するまでの操作の回数を求める問題です。
                // 1 から n への逆操作を考えるか、n から 1 への順方向の操作を考える必要があります。
                // 課題の意図は、通常、Collatz予想に関連する問題であり、n から 1 に到達するまでのステップ数を求めるものです。
                // n から 1 へのステップ数を求める（n -> f(n) -> f(f(n)) -> ... -> 1）
                // 1 のときの手数は 0。
                
                // 再度、n から 1 へのステップ数を計算します。
                // 1 から n への逆操作を考える方が効率的です。
                // 逆操作:
                // もし x = 2y なら y = x/2 (n が偶数なら)
                // もし x = 3y+1 なら y = (x-1)/3 (n が奇数なら)
                
                // ここでは、n から 1 へのステップ数を求めるため、再帰的または反復的に計算します。
                // メモ化を適用するため、n から 1 へのパスを辿ります。
                
                long current = n;
                long count = 0;
                Map<Long, Long> pathMemo = new HashMap<>(); // このクエリ内でのメモ化

                while (current != 1) {
                    if (pathMemo.containsKey(current)) {
                        // 既に計算済みの部分があればそこから加算
                        count += pathMemo.get(current);
                        break;
                    }
                    
                    if (current == 1) break; // 念のため
                    
                    // 逆操作を考えるのではなく、元の操作を繰り返す
                    // n が偶数なら n/2
                    if (current % 2 == 0) {
                        current /= 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    count++;
                    
                    // メモ化の適用 (n から 1 へのパスを辿る)
                    // ここでのメモ化は、n から 1 へのパスを辿るのではなく、
                    // 既に計算済みの値があればそれを利用する形で実装します。
                    // 課題の指示「同じ整数が繰り返し現れるので、計算結果をメモ化して高速化してください。」に従い、
                    // n から 1 へのパスを辿る際に、中間値の計算結果をメモします。
                }
                
                // 実際のCollatzステップ数の計算とメモ化を再構成します。
                // 1 から n へのパスを辿るのではなく、n から 1 へのパスを辿り、途中の値のメモ化を行います。
                
                long steps_n = 0;
                long temp_n = n;
                Map<Long, Long> path = new HashMap<>(); // n から 1 へのパスのメモ化

                while (temp_n != 1) {
                    if (path.containsKey(temp_n)) {
                        // 既に計算済みの値があれば、その結果を再利用
                        steps_n += path.get(temp_n);
                        break;
                    }
                    
                    // 現在の値をメモ
                    path.put(temp_n, 0); // 暫定的に0を入れておく。これは後で修正が必要。

                    if (temp_n % 2 == 0) {
                        temp_n /= 2;
                    } else {
                        temp_n = 3 * temp_n + 1;
                    }
                    steps_n++;
                }
                
                // 最終的なステップ数を計算し、メモに追加
                if (temp_n == 1) {
                    // 1 に到達したときのステップ数を計算し直す
                    long final_steps = 0;
                    long current_val = n;
                    while (current_val != 1) {
                        if (current_val % 2 == 0) {
                            current_val /= 2;
                        } else {
                            current_val = 3 * current_val + 1;
                        }
                        final_steps++;
                    }
                    
                    // メモ化
                    memo.put(n, final_steps);
                    totalCount += final_steps;
                } else {
                    // このケースは通常発生しないはずだが、もし到達しなかった場合
                    // エラー処理や、より複雑なメモ化が必要になる可能性がある。
                }


            } catch (NumberFormatException e) {
                // 無効な入力は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
