import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Integer> memo = new HashMap<>();
        
        long totalSteps = 0;
        
        while (true) {
            String line = reader.readLine();
            if (line == null) {
                break;
            }
            
            // 空行や整数として解釈できない行は無視する
            try {
                int n = Integer.parseInt(line.trim());
                totalSteps += getSteps(n, memo);
            } catch (NumberFormatException e) {
                // 解析エラーが起きたら無視してループ継続
                continue;
            }
        }
        
        System.out.println("total=" + totalSteps);
    }

    private static int getSteps(int n, Map<Long, Integer> memo) {
        long current = n;
        int steps = 0;
        
        while (current != 1) {
            long nextValue;
            if (current % 2 == 0) {
                nextValue = current / 2;
            } else {
                nextValue = (long)3 * current + 1;
            }
            
            if (memo.containsKey(nextValue)) {
                steps += memo.get((Integer)nextValue);
                break;
            }
            
            // メモリ化のために long を key に使う（Collatz 系列は long 範囲に収まる可能性がある）
            memo.put((long)current, steps + getStepsLong(nextValue, memo));
            current = nextValue;
            steps++;
        }
        
        return memo.getOrDefault(current, 0);
    }

    private static int getStepsLong(long n, Map<Long, Integer> memo) {
        if (n == 1) {
            return 0;
        }
        
        if (memo.containsKey(n)) {
            return memo.get((Integer)n);
        }
        
        long nextValue;
        if (n % 2 == 0) {
            nextValue = n / 2;
        } else {
            nextValue = 3 * n + 1;
        }
        
        int steps = 1 + getStepsLong(nextValue, memo);
        memo.put(n, steps);
        return steps;
    }
}
