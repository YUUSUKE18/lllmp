import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Map;
import java.util.HashMap;

public class Main {
    private static Map<Long, Integer> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            
            try {
                long n = Long.parseLong(line);
                
                int steps = getSteps(n);
                total += steps;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }

    private static int getSteps(long n) {
        if (n == 1) {
            return 0;
        }
        
        if (memo.containsKey(n)) {
            return memo.get((int)n); // メモリーに格納されている値は int 范围内の回数なのでキャストして取得（問題文の手数範囲内）
        }

        int steps = 0;
        long next = n;
        
        while (next != 1) {
            if (next % 2 == 0) {
                next /= 2;
            } else {
                next = 3 * next + 1;
            }
            steps++;
        }
        
        return memo.put((int)n, steps); // メモリ化（注：実際は int 範囲の手数しか記憶されないため、戻り値の配列要素更新）
    }
}
