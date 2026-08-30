import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

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
        boolean foundNumber = false;

        for (String part : parts) {
            try {
                // 空でない、トリム後の文字列をチェック
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    long value = Long.parseLong(trimmedPart);
                    count++;
                    if (value > max) {
                        max = value;
                    }
                    foundNumber = true;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        if (!foundNumber) {
            // 整数が見つからなかった場合は、count=0 max=0 または適切な初期値を設定するが、ここでは空のリストとして扱う。
            // 仕様上は「読み込んだ要素数と最大値」なので、数値が存在しない場合は count=0, max=0 が妥当。
             System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
