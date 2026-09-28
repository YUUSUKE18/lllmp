import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=-1"); // または適切なデフォルト値。ここでは空入力として0個、最大値は定義されないため-1とする。
            return;
        }

        String[] parts = line.split(",");
        long count = 0;
        long maxVal = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白を無視して整数として解釈を試みる
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedPart);
                count++;
                if (value > maxVal) {
                    maxVal = value;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        if (!foundNumber) {
            // 整数要素が一つもなかった場合、count=0, maxの扱いを決定する必要がある。
            // 仕様に基づき、もし入力に有効な数値が一つもなかった場合は、count=0, maxは無効または最小値とする。
            System.out.println("count=0 max=-1"); // 数値がない場合は最大値を定義できないため-1などとしておく
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
