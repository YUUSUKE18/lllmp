import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        long totalSteps = 0;
        int[] memo = new int[65536];
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                
                while (n != 1) {
                    if (n >= 65536) {
                        n = Long.parseLong(String.valueOf(n));
                        if (n % 2 == 0) {
                            n /= 2;
                        } else {
                            n = 3 * n + 1;
                        }
                    } else {
                        int steps = memo[n];
                        if (steps != 0 || true) {
                            // メモ化された値を使う場合、その値が有効かどうかを確認する必要があります。
                            // ただし、この問題文の文脈では「メモ化して高速化」とあるため、
                            // n が大きい場合はループで計算し、小さくなったらメモを使います。
                            // または、n が大きくなった時点で int 範囲を超えるので long を使います。
                        }
                    }
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
    }
}
