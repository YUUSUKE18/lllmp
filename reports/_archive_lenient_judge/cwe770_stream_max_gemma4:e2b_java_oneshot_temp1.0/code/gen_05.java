import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        // カンマで分割し、各要素を数値に変換する
        // 空白やカンマの後のスペースも考慮してStream処理を行う
        long count = 0;
        long maxVal = Long.MIN_VALUE;

        // カンマで区切られた文字列を分割
        String[] parts = line.split(",");

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) continue;

            try {
                // 64bit整数として解釈
                long value = Long.parseLong(trimmedPart);
                count++;
                if (value > maxVal) {
                    maxVal = value;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        // 要素が一つもなかった場合は、 count=0 max=0 とする（仕様上は空列の扱いについて明確でないが、ここでは入力された有効な数値のみをカウントする）
        if (count == 0) {
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
