import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=-1"); // または適切なデフォルト値。ここでは要素がない場合の処理を考慮し、最大値を-1とする。
            return;
        }

        String[] parts = line.split(",");
        long count = 0;
        long maxVal = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白を無視して整数として解釈を試みる
            try {
                // trim()で前後の空白を除去
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    long value = Long.parseLong(trimmedPart);
                    count++;
                    if (value > maxVal) {
                        maxVal = value;
                    }
                    foundNumber = true;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        // 整数として解釈できた要素が一つもなかった場合、count=0, maxの扱いは仕様に依存するが、ここでは最大値を-1（または最小値）とする。
        if (!foundNumber) {
             System.out.println("count=0 max=-1"); // ゼロ個で最大値は定義できないため、安全のため-1を設定
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
