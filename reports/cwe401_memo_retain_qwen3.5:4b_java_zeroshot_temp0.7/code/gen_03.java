import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        int totalSteps = 0;

        String line;
        while ((line = reader.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line);
                totalSteps += collatzLength(n);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static int collatzLength(long n) {
        if (n == 1) {
            return 0;
        }
        
        long original = n;
        while (true) {
            synchronized (Main.class) { // 基本的な同期、または Map の構造体によるロック
                Integer cached = memo.get((int)(original));
                if (cached != null) {
                    return cached;
                }
            }

            int steps = 0;
            while (!memo.containsKey(original)) {
                if (original % 2 == 0) {
                    original /= 2;
                } else {
                    original = 3 * original + 1;
                }
                steps++;
            }

            memo.put((int)original, steps); // 現在の n の値に対応するステップ数を格納します。
            return memo.get((int)original);
        }
    }
}
