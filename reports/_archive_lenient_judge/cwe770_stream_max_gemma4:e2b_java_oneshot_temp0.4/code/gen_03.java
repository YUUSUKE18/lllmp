import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=-1"); // 空入力の場合の処理（最大値は定義できないため-1など）
            return;
        }

        // カンマで分割し、各要素を処理する
        String[] parts = line.split(",");
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                // 64bit整数として解釈
                long n = Long.parseLong(trimmedPart);
                count++;
                if (n > maxValue) {
                    maxValue = n;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        // 整数として解釈できた要素が一つもなかった場合、count=0, max=-1などとして出力する（問題の制約上、入力が空でない限り最大値が存在すると仮定しても良いが、安全のため）
        if (!foundNumber) {
            System.out.println("count=0 max=-1"); // または適切なデフォルト値。ここでは最大値が存在しないことを示すため-1とする。
        } else {
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
