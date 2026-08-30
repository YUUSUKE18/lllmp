import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=-1"); // 空入力の場合は0個、最大値は定義しない（ここでは便宜的に-1とするか、仕様に応じて調整。ここでは安全のため0を返す）
            return;
        }

        String[] parts = line.split(",");
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }
            try {
                long value = Long.parseLong(trimmedPart);
                count++;
                if (value > maxValue) {
                    maxValue = value;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        if (!foundNumber) {
            // 有効な整数が一つも見つからなかった場合
            System.out.println("count=0 max=-1"); // または count=0 max=0 など、問題の制約に依存するが、ここでは-1で区別する。
        } else {
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
