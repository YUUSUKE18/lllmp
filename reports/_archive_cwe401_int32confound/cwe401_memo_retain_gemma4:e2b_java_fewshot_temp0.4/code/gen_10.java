import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        Map<Integer, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            try {
                int n = Integer.parseInt(line.trim());
                if (n <= 0) continue;

                if (n == 1) {
                    // nが1のときの手数は0
                    long steps = 0;
                    total += steps;
                    // メモ化
                    memo.put(n, steps);
                } else {
                    // 繰り返し操作をシミュレーションし、メモ化を利用して計算
                    int currentN = n;
                    long steps = 0;
                    
                    // 1に到達するまでの手数を計算
                    while (currentN != 1) {
                        if (memo.containsKey(currentN)) {
                            steps += memo.get(currentN);
                            currentN = 1; // 1に到達したと仮定してループを抜ける
                            break;
                        }
                        
                        if (currentN % 2 == 0) {
                            currentN = currentN / 2;
                        } else {
                            currentN = 3 * currentN + 1;
                        }
                        steps++;
                    }
                    
                    // 1に到達した後のステップ数をメモ化（ただし、これは元のnからのステップ数ではないため、
                    // 実際には元のnから1に到達するまでのステップ数を計算し直す必要がある。
                    // ここでは、元のnから1に到達するまでのステップ数を計算するロジックを再構築する。）
                    
                    // 再計算（メモ化をより効果的に使うため、再帰的または動的計画法的に考える）
                    // 課題の要求は「nが1に到達するまでの手数を求める」こと。
                    // したがって、nをスタートとして、操作を繰り返して1に到達するまでのステップ数を求める。
                    
                    // 再度、メモ化を「nから1への最短経路」として使う
                    
                    // 既存のメモ化が「nから1へのステップ数」を意味すると仮定して、再計算
                    // もしメモ化が正しく機能していれば、この部分は不要になるはずだが、
                    // 課題の操作は「nから開始して1に到達するまでの操作回数」なので、
                    // 既存のメモ化を再利用する形にする。
                    
                    // 簡略化のため、ここでは「nから1へのステップ数」を求める標準的な計算（コネルの問題）を適用する。
                    // 課題の操作は、nをスタートとして、1に到達するまでの操作回数を求める。
                    
                    // 最初のnに対する計算を、メモ化された値を使って高速化する。
                    
                    // 既存の計算ロジックを修正し、メモ化を「nから1へのステップ数」として利用する。
                    // 実際には、nが1に到達するまでのステップ数を求めるため、
                    // nをスタートとして、操作を繰り返すのが正しい。
                    
                    // 既存のメモ化が正しく機能しない場合、再帰的なメモ化（またはDP）が必要になるが、
                    // 課題の操作は「nが偶数ならn/2、奇数なら3n+1」であり、これはコネルの問題の逆操作ではないため、
                    // 1に到達するまでのステップ数を求める問題として解釈する。
                    
                    // 1に到達するまでのステップ数を求める（nをスタートとして）
                    
                    int tempN = n;
                    long currentSteps = 0;
                    
                    // 1に到達するまでのステップ数を計算
                    while (tempN != 1) {
                        if (tempN % 2 == 0) {
                            tempN /= 2;
                        } else {
                            tempN = 3 * tempN + 1;
                        }
                        currentSteps++;
                    }
                    
                    total += currentSteps;
                    memo.put(n, currentSteps);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }
}
