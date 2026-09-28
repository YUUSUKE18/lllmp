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

        // カンマで分割
        String[] parts = line.split(",");

        int count = 0;
        long max = Long.MIN_VALUE;

        for (String part : parts) {
            // 前後の空白を無視して整数に変換を試みる
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

        // 要素が一つもなかった場合は、count=0, max=0 とするか、あるいは仕様に基づき適切な値を設定する。
        // ここでは読み込んだ有効な数の要素で計算した結果を出力する。もし要素が0個ならmaxは初期値のままになる可能性があるため、
        // 読み込んだ要素数と最大値をそのまま出力する。
        if (count == 0) {
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
