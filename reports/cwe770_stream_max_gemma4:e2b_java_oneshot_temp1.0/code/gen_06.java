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
                long number = Long.parseLong(trimmedPart);
                count++;
                if (number > maxValue) {
                    maxValue = number;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 無効な要素は無視
            }
        }

        if (count == 0) {
            // 整数として解釈できる要素が一つもなかった場合、最大値を定義できないため0とするか、仕様に基づき判断する。
            // ここでは、入力された数値のみをカウントするため、数値が一つもない場合は count=0, max=0 とする。（元の例の意図を考慮）
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
