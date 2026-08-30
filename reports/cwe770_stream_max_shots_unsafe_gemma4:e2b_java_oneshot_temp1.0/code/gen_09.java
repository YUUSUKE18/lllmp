import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        // カンマで分割
        String[] parts = line.split(",");

        int count = 0;
        long max = Long.MIN_VALUE;

        for (String part : parts) {
            // 前後の空白を除去
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedPart);
                count++;
                if (value > max) {
                    max = value;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        // 要素が一つもなかった場合は、count=0 max=0 とするのが自然ですが、
        // 全ての有効な整数を数えた結果を出力します。
        if (count == 0) {
            // 入力に数値が存在しなかった場合、最大値は定義できませんが、
            // 問題の制約から数える要素がない場合は0とするか、あるいは空の入力を許容しないと仮定します。
            // 今回は入力された有効な整数のみをカウント・最大値とします。
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
