import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int totalSteps = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                
                if (memo.containsKey(n)) {
                    totalSteps += memo.get(n);
                } else {
                    int steps = 0;
                    int current = n;
                    
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current = current / 2;
                        } else {
                            // 3n+1 を計算する際、long で計算して再キャスト
                            long nextVal = (long) current * 3 + 1;
                            // 64bit 整数の範囲内なら int に戻せるか確認（問題文は収まると言っているが安全のため）
                            if (nextVal > Integer.MAX_VALUE || nextVal < Integer.MIN_VALUE) {
                                // 問題文「64bit 整数の範囲には収まります」とあるので、int として扱う前提だが
                                // 実際には long を使って計算し、結果が int 範囲内なら int に変換
                                current = (int) nextVal;
                            } else {
                                current = (int) nextVal;
                            }
                        }
                        steps++;
                    }
                    
                    memo.put(n, steps);
                    totalSteps += steps;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + totalSteps);
    }
}
