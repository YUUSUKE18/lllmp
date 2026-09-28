import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        // カンマで分割してトークンを抽出
        String[] tokens = line.split(",");
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String token : tokens) {
            String trimmedToken = token.trim();
            if (trimmedToken.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedToken);
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
            // 数値が一つもなかった場合は、count=0 max=0 とする（または仕様に依存するが、ここではゼロとする）
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
