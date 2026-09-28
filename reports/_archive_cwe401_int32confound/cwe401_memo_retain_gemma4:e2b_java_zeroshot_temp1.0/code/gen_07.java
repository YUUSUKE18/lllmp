import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
        Map<Integer, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            // 空行を無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line.trim());

                // ベースケース
                if (n == 1) {
                    // 1 のときの手数は 0
                    memo.put(n, 0L);
                } else if (memo.containsKey(n)) {
                    // メモ化された値があればそれを使用
                    long steps = memo.get(n);
                    totalSteps += steps;
                } else {
                    // 再帰的な計算（または繰り返し操作をシミュレーション）
                    // ここでは、n から 1 に到達するまでの手数を求める。
                    // 操作: nが偶数なら n/2, 奇数なら 3n+1
                    // これはCollatz予想に関連する問題だが、今回は「1に到達するまでの手数」を問う。
                    
                    // スタックまたは再帰で計算し、メモ化する
                    // ただし、操作が「1に到達するまでの手数」を求めるため、
                    // n から 1 への経路を辿る必要がある。
                    // 質問の意図は「nが操作を繰り返して1になるまでのステップ数」と解釈する。

                    // 1に到達するまでのステップ数を計算する
                    // nが1に到達するまでのステップ数を求めるためには、
                    // nを操作し続ける過程で、既に計算済みの値があればそれを利用する。
                    // しかし、この問題は「nを操作し続ける」というよりは「1に到達するまで」を問う。
                    
                    // 標準的なCollatz問題の文脈で、nを1に到達するまでのステップ数を計算する。
                    // 操作の定義:
                    // nが偶数なら n/2
                    // nが奇数なら 3n+1
                    
                    // 1に到達するまでのステップ数を計算する（繰り返し操作）
                    int current = n;
                    long steps = 0;
                    // サイクル検出のためのセット（無限ループ対策、ただしCollatzは収束すると仮定）
                    // ここでは、操作の適用過程でメモ化を最大限に活用する。

                    // nから1へのパスを辿り、途中でメモ化された値があればそれを利用する
                    // 簡略化のため、ここでは一度の操作で次のステップに進み、到達した結果をメモする。
                    
                    // 実際には、nを操作して1に到達するまでのステップ数を求める。
                    // 1からnへの逆操作を考えるか、nから1への順方向を考える。
                    // 問題文の操作は「nが偶数なら n/2、奇数なら 3n+1」である。
                    // この操作を繰り返すことで1に到達するまでの手数を求める。
                    
                    // スタート値 n からスタートし、1に到達するまでの操作回数を数える。
                    // ただし、メモ化を適用するため、nが計算済みの値に到達した場合はそのステップ数を加算する。
                    
                    // この問題は、nを操作して1に到達するまでのステップ数を求めるため、
                    // 通常のCollatzのステップ数を求めるアプローチを採用する。
                    
                    // スタート値 n からスタート
                    int tempN = n;
                    long count = 0;
                    // 計算途中でメモが使われることを考慮し、まずは単に操作を繰り返す
                    while (tempN != 1) {
                        if (memo.containsKey(tempN)) {
                            // 既に計算済みの値に到達した場合、その差分を加算する
                            count += memo.get(tempN);
                            break; // このパスはここで終了
                        }
                        
                        if (tempN % 2 == 0) {
                            tempN /= 2;
                        } else {
                            tempN = 3 * tempN + 1;
                        }
                        count++;
                    }
                    
                    if (tempN == 1) {
                        // 1に到達した場合、現在のステップ数をメモする
                        memo.put(n, count);
                        totalSteps += count;
                    }
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // メモ化された値から合計を再計算する（上記ループ内での合計加算が不十分な場合を考慮）
        // 上記のロジックでは、nが初めて登場したときの計算のみ合計に加算される設計になっているため、
        // 漏れがないか確認が必要。
        
        // 再度、すべてのクエリに対してメモ化された結果を合計する方が安全。
        // しかし、入力順序を無視して全てのメモを合計するのではなく、入力されたクエリ順に処理した結果を合計する。
        // 最初のループ内でtotalStepsを加算しているので、その結果を出力する。

        System.out.println("total=" + totalSteps);
    }
}
