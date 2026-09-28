import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        // カンマで分割し、各要素を処理する
        String[] parts = line.split(",");
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白をトリム
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
                // 整数として解釈できない要素は無視する
            }
        }

        // 数値が見つからなかった場合は count=0 max=0 とする（または適切な初期値、ここでは数値を読み取った要素の個数と最大値を出力）
        if (!foundNumber) {
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
