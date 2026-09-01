import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Integer> memo = new HashMap<>();
        long totalSteps = 0;

        String line;
        while ((line = reader.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            try {
                int n = Integer.parseInt(line);
                if (n < 1) {
                    continue;
                }

                long currentVal = n;
                int stepsForCurrent = memo.getOrDefault(currentVal, -1);
                
                while (stepsForCurrent == -1 && currentVal != 1) {
                    if (currentVal % 2 == 0) {
                        currentVal /= 2;
                    } else {
                        currentVal = 3 * currentVal + 1;
                    }
                    stepsForCurrent = memo.getOrDefault(currentVal, -1);
                }

                int steps = stepsForCurrent;
                if (steps == -1) {
                    // 計算が完了していない場合、実際に計算する（これは n=1 のみでループ条件に合致するため）
                    steps = 0; 
                }
                
                totalSteps += steps;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }
}
