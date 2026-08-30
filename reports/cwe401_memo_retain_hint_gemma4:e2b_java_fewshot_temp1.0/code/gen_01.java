import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder totalBuilder = new StringBuilder();
        long totalSum = 0;

        String line;
        while ((line = br.readLine()) != null && !line.trim().isEmpty()) {
            try {
                long n = Long.parseLong(line.trim());

                // メモ化された結果を格納するマップ
                Map<Long, Long> memo = new HashMap<>();

                // 繰り返し計算とメモ化
                long count = 0;
                long currentN = n;
                
                // 計算が無限ループに陥ることを防ぐための安全策（実際には3n+1問題の過程で1に到達するため、収束が保証される）
                while (currentN != 1) {
                    if (memo.containsKey(currentN)) {
                        // メモから取得してループを抜ける
                        count += memo.get(currentN);
                        currentN = 1; // 計算結果は既にカウント済みとみなし、次のステップに進む（実際はここで加算して終了）
                        break;
                    }

                    // 現在のステップでの操作とカウント
                    if (currentN % 2 == 0) {
                        currentN /= 2;
                    } else {
                        currentN = 3 * currentN + 1;
                    }
                    count++;

                    // 境界チェック（64bit範囲に収まっていることを前提とするが、念のため）
                    if (currentN < 1) {
                        // 1に到達しない、または負の値になった場合はエラー（問題の性質上発生しないはず）
                        break; 
                    }
                }
                
                // 最終結果のメモ化
                if (currentN == 1) {
                    // 1に到達するまでの手数を記録（nが1の場合は0）
                    memo.put(n, count);
                }

                // 結果の加算（メモ化に依存しない場合の計算）
                if (!memo.containsKey(n)) {
                    // メモ化されなかった場合（通常は到達するはず）、再計算して加算
                    long tempN = n;
                    long steps = 0;
                    while (tempN != 1) {
                        if (tempN % 2 == 0) {
                            tempN /= 2;
                        } else {
                            tempN = 3 * tempN + 1;
                        }
                        steps++;
                    }
                    totalSum += steps;
                } else {
                    // メモ化されていた場合
                    totalSum += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        totalBuilder.append("total=").append(totalSum).append("\n");
        System.out.print(totalBuilder.toString());
    }
}
