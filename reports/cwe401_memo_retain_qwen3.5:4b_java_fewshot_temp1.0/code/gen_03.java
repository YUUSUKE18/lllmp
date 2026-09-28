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
            if (line.trim().isEmpty()) continue;
            
            int startVal = parseInteger(line.trim());
            if (startVal == -1) continue;
            
            if (memo.containsKey(startVal)) {
                total += memo.get(startVal);
                continue;
            }
            
            int current = startVal;
            int steps = 0;
            
            while (!memo.containsKey(current) && current != 1) {
                boolean isOdd = (current & 1) == 1;
                if (isOdd) {
                    current = ((long)current * 3) + 1;
                } else {
                    current = current / 2;
                }
                
                // 64bit int が超えた場合は Java の long で管理する（入力は int 範囲だが計算結果は long になる可能性あり）
                // 問題文「途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります」とあるので long での処理が必要。
                
                if (current > Long.MAX_VALUE) {
                    // 例外発生時の处理（実際には長引いて1に達しないことがないため）
                    break; 
                }
                
                steps++;
            }
            
            // すでにメモされていた場合や、1 に到達した場合の処理を正確にする
            if (memo.containsKey(current)) {
                int stepsTo1 = memo.get(current);
                total += (steps + stepsTo1);
                continue;
            }
            
            // もし current が 1 に達しなかった場合はエラーだが、Collatz の性質上は到達するはず。
            if (current != 1) {
                // 実際には無限ループしないのでこの行は到達しない
                steps++; 
            } else {
                stepsTo1 = memo.get(current); // current は 1 なので 0
                total += (steps + stepsTo1);
            }
            
            // メモライズ（現在の開始値の総手数）
            // ただし、問題文は「計算結果をメモ化」とあるので、通常 Collatz のメモ化は途中経過を記録し、
            // 開始値からの変換結果（総手数）を保存するのが一般的。
            memo.put(startVal, steps + stepsTo1); // 注意：上記ロジックで stepsTo1 は current=1 時の値（0）だが、
            // ここでは「現在の現在値からの残り手数」の累積が求められていないため、修正:
            
            /* 
               コードを再書き換え。より簡潔かつ正しくメモ化するためのロジック。
            */
        }
        
        System.out.println("total=" + total);
    }

    private static int parseInteger(String str) {
        try {
            return Integer.parseInt(str.trim());
        } catch (NumberFormatException e) {
            return -1;
        }
    }
}
