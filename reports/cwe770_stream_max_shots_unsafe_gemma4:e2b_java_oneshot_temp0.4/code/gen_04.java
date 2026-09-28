import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        String[] parts = line.split(",");
        int count = 0;
        long max = Long.MIN_VALUE;

        for (String part : parts) {
            // 前後の空白を無視して整数として解釈を試みる
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
                // 整数として解釈できない要素は無視する
            }
        }

        // 要素が一つもなかった場合は、count=0, max=0 または count=0, max=Long.MIN_VALUE の扱いを考慮する。
        // 問題の文脈から、入力された有効な整数のみを数えるため、要素数が0の場合は最大値は定義されないが、
        // 少なくとも1行出力する必要がある。ここでは、読み込んだ有効な数値の数をカウントし、
        // 数値が存在しない場合は max=0 とするのが自然だが、もし入力が空なら count=0, max=0 とする。
        if (count == 0) {
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
