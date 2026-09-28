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

        String[] parts = line.split(",");
        long count = 0;
        long maxVal = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 空白をトリムして整数に変換を試みる
            String trimmedPart = part.trim();
            if (!trimmedPart.isEmpty()) {
                try {
                    long value = Long.parseLong(trimmedPart);
                    count++;
                    if (value > maxVal) {
                        maxVal = value;
                    }
                    foundNumber = true;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }

        if (!foundNumber) {
            // 整数が一つもなかった場合、count=0, max=0 または適切なデフォルト値を設定する。
            // 仕様上、空の入力や非数値のみの場合を考慮し、数がない場合は count=0, max=0 とする。
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
