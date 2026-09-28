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

        // カンマで分割し、前後の空白を無視して整数としてパースする
        String[] parts = line.split(",");
        int count = 0;
        long max = Long.MIN_VALUE;

        for (String part : parts) {
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

        // 要素が一つもなかった場合は、count=0, max=0 とする（問題の制約から、入力が空の場合を考慮）
        if (count == 0) {
            max = 0; // 空のリストに対する最大値は定義によりますが、ここでは0とする
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
