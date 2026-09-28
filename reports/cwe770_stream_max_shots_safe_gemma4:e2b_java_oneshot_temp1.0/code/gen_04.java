import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        // カンマで分割し、前後の空白を無視して整数としてパース
        Stream.of(line.split(","))
              .filter(s -> !s.trim().isEmpty())
              .map(String::trim)
              .mapToLong(Long::parseLong)
              .forEach(value -> System.out.print(value + " "));

        // 処理された値を再集計し、countとmaxを出力するためにストリームの利用を避けるため、改めて手動で処理する方が安全かつ要件に厳密に対応できる。
        // 今回は、入力がカンマ区切りの整数列であり、「要素数」と「最大値」を求める必要がある。
        // カンマ区切りの文字列を直接パースし、要素数を数える。

        String[] parts = line.split(",");
        long count = 0;
        long maxVal = Long.MIN_VALUE;
        boolean foundAny = false;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (!trimmedPart.isEmpty()) {
                try {
                    long value = Long.parseLong(trimmedPart);
                    count++;
                    if (value > maxVal) {
                        maxVal = value;
                    }
                    foundAny = true;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        if (!foundAny) {
            // 入力が空または無効な値のみだった場合、count=0, max=???。仕様に従いmaxの初期値を考慮する。
            // もし入力が空文字列やカンマのみだった場合 (例: "," や " , "), count=0, maxは定義されないが、ここでは0とするのが妥当か。
            // 整数として解釈できた要素がない場合は、count=0, max=0 とする。
             System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
