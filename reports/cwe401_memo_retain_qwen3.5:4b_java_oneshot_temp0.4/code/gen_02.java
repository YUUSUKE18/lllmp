import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                
                if (memo.containsKey(n)) {
                    total += memo.get(n);
                } else {
                    int steps = 0;
                    int current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            // 64bit 整数の範囲に収まるため、long を使用して計算
                            long nextVal = (long)3 * current + 1;
                            if (nextVal > Integer.MAX_VALUE) {
                                current = (int)nextVal;
                            } else {
                                current = (int)nextVal;
                            }
                        }
                        steps++;
                    }
                    
                    memo.put(n, steps);
                    total += steps;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + total);
    }
}
