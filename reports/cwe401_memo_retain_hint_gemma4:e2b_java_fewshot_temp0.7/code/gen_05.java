import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        // メモ化のためのマップ
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    totalCount += 0;
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 再帰/動的計画法による計算
                long count = 0;
                long currentN = n;
                
                // 1に到達するまでのステップ数を計算
                while (currentN != 1) {
                    if (memo.containsKey(currentN)) {
                        // 途中でメモ化された値に到達した場合
                        count += memo.get(currentN);
                        break;
                    }
                    
                    if (currentN % 2 == 0) {
                        currentN = currentN / 2;
                    } else {
                        currentN = 3 * currentN + 1;
                    }
                    count++;
                }
                
                // 1に到達した場合、または途中でメモ化された値に到達した場合
                if (currentN == 1) {
                    // 1に到達するまでのステップ数を計算（memo化を更新しながら）
                    long steps = 0;
                    long tempN = n;
                    while (tempN != 1) {
                        if (memo.containsKey(tempN)) {
                            steps += memo.get(tempN);
                            break;
                        }
                        
                        if (tempN % 2 == 0) {
                            tempN = tempN / 2;
                        } else {
                            tempN = 3 * tempN + 1;
                        }
                        steps++;
                    }
                    
                    if (tempN == 1) {
                        // 最終的に1に到達した際のステップ数を計算し、メモ化
                        // この問題は「1に到達するまでの手数」を求めるため、
                        // 毎回計算するのではなく、到達する過程で合計を求める必要がある。
                        // ここでは、クエリ n ごとに n から 1 へのパスの長さを計算し、合計する。
                        
                        // 再計算（メモ化を考慮した再帰的なアプローチ）
                        long pathLength = 0;
                        long current = n;
                        Map<Long, Long> pathMemo = new HashMap<>();
                        pathMemo.put(1L, 0L);
                        
                        while (current != 1) {
                            if (pathMemo.containsKey(current)) {
                                pathLength += pathMemo.get(current);
                                break;
                            }
                            
                            if (current % 2 == 0) {
                                current = current / 2;
                            } else {
                                current = 3 * current + 1;
                            }
                            pathLength++;
                        }
                        
                        if (current == 1) {
                             // 最終的に1に到達したときのステップ数 (nから1へのパス長)
                             // この問題の要求は「操作を繰り返して1に到達するまでの手数」であり、
                             // 1に到達するまでの操作回数を求める。
                             // 1に到達するまでの操作回数を求めるため、上記ループで計算された steps がその値となる。
                             totalCount += steps;
                        }
                        
                        // 一度計算した結果をメモ化
                        memo.put(n, steps);
                        
                    } else {
                        // 1に到達しなかった場合（この問題では起こらないはずだが念のため）
                        // エラー処理または無視
                    }

                } else {
                    // 1に到達しなかった場合の処理（本来は起こらない）
                }

                // 全てを1に到達するまでの手数として計算する（メモ化を更新する）
                // 厳密には、各 n について、その n から 1 へのパス長を計算し合計する。
                // 以下のロジックは、各 n について、その n から 1 へのパス長を計算し、
                // それを合計する、という指示に最も忠実な実装を目指す。
                
                // 再度、単純なパス長計算とメモ化を統合する
                long steps = 0;
                long currentVal = n;
                Map<Long, Long> path = new HashMap<>();
                path.put(1L, 0L);
                
                while (currentVal != 1) {
                    if (path.containsKey(currentVal)) {
                        steps += path.get(currentVal);
                        break;
                    }
                    
                    if (currentVal % 2 == 0) {
                        currentVal = currentVal / 2;
                    } else {
                        currentVal = 3 * currentVal + 1;
                    }
                    path.put(currentVal, path.get(currentVal) + 1);
                    steps++;
                }
                
                if (currentVal == 1) {
                    totalCount += steps;
                }
                
                // 最終的な結果をメモ化
                memo.put(n, steps);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
