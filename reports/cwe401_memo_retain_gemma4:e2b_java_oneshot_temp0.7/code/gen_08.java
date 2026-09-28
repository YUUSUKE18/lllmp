import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
        Map<Long, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }
            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // 1に到達するまでの手数は0
                    // ただし、このnがクエリの開始値として与えられた場合、
                    // 1に到達するまでの操作回数を数える必要がある。
                    // 課題の記述「n が 1 のときの手数は 0 です」に従う。
                    if (!memo.containsKey(n)) {
                        memo.put(n, 0L);
                    }
                    totalSteps += memo.get(n);
                    continue;
                }

                if (memo.containsKey(n)) {
                    // メモがあればその結果を合計に加算
                    totalSteps += memo.get(n);
                    continue;
                }

                // メモがない場合、再帰的または反復的に計算
                // 3n+1 または n/2 の操作を繰り返す
                long currentN = n;
                long steps = 0;
                Map<Long, Long> path = new HashMap<>(); // 経路をメモするためのマップ

                // 1に到達するまでの手順を追跡し、メモ化する
                while (currentN != 1) {
                    if (memo.containsKey(currentN)) {
                        // 途中経過でメモがあればそれを利用
                        steps += memo.get(currentN);
                        break;
                    }

                    // サイクル検出とメモ化のために、現在地を記録
                    path.put(currentN, steps);

                    if (currentN % 2 == 0) {
                        currentN /= 2;
                    } else {
                        currentN = 3 * currentN + 1;
                    }
                    steps++;

                    // サイクル検出（同じ値に戻った場合）
                    if (path.containsKey(currentN)) {
                        // サイクルが検出された場合、現在のステップ数とサイクル内のステップ数を考慮して閉じた形の計算を行う
                        long cycleStartStep = path.get(currentN);
                        long cycleLength = steps - cycleStartStep;
                        
                        // サイクル内のステップ数を再計算して、サイクルをスキップする
                        long stepsInCycle = 0;
                        for(Map.Entry<Long, Long> entry : path.entrySet()) {
                            if (entry.getKey().equals(currentN)) {
                                // サイクルをスキップする
                                break;
                            }
                            stepsInCycle += entry.getValue();
                        }
                        
                        // サイクルをスキップした後の残りのステップを計算
                        long stepsToSkip = steps - cycleStartStep;
                        long remainingSteps = stepsToSkip % cycleLength;
                        
                        // サイクルをスキップした後のステップ数
                        steps = cycleStartStep + remainingSteps;
                        
                        // サイクルをスキップした後の値は、pathから取得（これは現在のcurrentNではないため注意が必要）
                        // ここでは、単純にサイクル内の移動を計算し直す方が安全。
                        
                        // サイクルをスキップして、1に到達するまでのステップ数を再計算する
                        // サイクル内の値を再計算する
                        long tempN = currentN;
                        long cycleSteps = 0;
                        while(tempN != 1) {
                            if (memo.containsKey(tempN)) {
                                steps += memo.get(tempN);
                                break;
                            }
                            if (path.containsKey(tempN)) {
                                // サイクル内の処理
                                long cycleStart = path.get(tempN);
                                long cycleLen = steps - cycleStart;
                                long stepsInCycle = steps - cycleStart;
                                long remainder = (steps - cycleStart) % cycleLen;
                                steps = cycleStart + remainder;
                                break;
                            }
                            
                            if (tempN % 2 == 0) {
                                tempN /= 2;
                            } else {
                                tempN = 3 * tempN + 1;
                            }
                            steps++;
                        }
                        
                        // サイクル検出後の処理が複雑になるため、ここでは単純化し、メモ化が十分な範囲を想定する。
                        // 厳密なサイクル検出とメモ化は、求めているのが「1への到達までの総ステップ数」であるため、
                        // 1への到達までの過程をメモ化する再帰的メモ化（DP）の方が自然。
                        // 今回は、与えられた制約に従い、単純な反復とメモ化で進める。
                        break; // 複雑なサイクル検出は省略し、メモ化で対応する
                    }
                }

                // 最終結果をメモに保存
                if (currentN == 1) {
                    memo.put(n, steps);
                } else {
                    // サイクル検出がうまくいかなかった場合、現在のNをメモに追加（これはDPの再帰呼び出しに依存する）
                    // 今回は、memo化された値がない限り、再計算した結果をセットする。
                    // サイクル検出が複雑になるため、memo化された値がない限り、単純な繰り返しで進めることに焦点を当てる。
                    memo.put(n, steps);
                }

                totalSteps += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }
}
