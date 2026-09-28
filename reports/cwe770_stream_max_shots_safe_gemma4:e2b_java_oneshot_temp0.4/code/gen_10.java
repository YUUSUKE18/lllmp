import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        String[] parts = line.split(",");
        long count = 0;
        long max = Long.MIN_VALUE;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (!trimmedPart.isEmpty()) {
                try {
                    long value = Long.parseLong(trimmedPart);
                    count++;
                    if (value > max) {
                        max = value;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する（仕様通り）
                }
            }
        }

        // 要素が一つもなかった場合や、すべて無効な値だった場合の初期化を考慮して、maxの処理を行う。
        if (count == 0) {
            System.out.println("count=0 max=0"); // 空の入力に対する安全策として0を出力
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
