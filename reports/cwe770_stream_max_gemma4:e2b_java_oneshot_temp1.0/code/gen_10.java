import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        // カンマで分割して整数列を取得
        String[] parts = line.split(",");
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (!trimmedPart.isEmpty()) {
                try {
                    // 64bit整数として解釈
                    long value = Long.parseLong(trimmedPart);
                    count++;
                    if (value > maxValue) {
                        maxValue = value;
                    }
                    foundNumber = true;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        // 整数として解釈できた要素があった場合のみ出力
        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
             // 数値が一つもなかった場合は、0個と最大値0などで対応する（仕様上は「要素数と最大値を求めます」なので、数値がない場合は0,0とするのが妥当だが、ここでは読み取った有効な数のみをカウントとして扱う）
             // 厳密には、数値が存在しない場合は count=0 max=何らかのデフォルト値となる。入力に数値が一つもなかった場合、count=0, max=0が最も安全かもしれない。
            System.out.println("count=0 max=0");
        }
    }
}
