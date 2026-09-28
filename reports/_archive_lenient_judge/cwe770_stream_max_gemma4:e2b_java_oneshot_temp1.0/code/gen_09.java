import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=-1"); // 空入力の場合は個数0、最大値を定義しない（ここでは便宜上-1とする）
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

        if (!foundNumber) {
            // 有効な整数が一つもなかった場合。仕様上、空の入力や全て無効な入力に対する処理を考慮する必要がある。
            // 整数が存在しない場合は count=0, max=? となるが、ここでは最大値が出現しなかったことを示すために特別な値を設定する。
            // 問題文には「要素数」と「最大値」を求めるとあるため、データがない場合は count=0, max=? とする。
            // 数値が存在しない場合の最大値は通常定義されないが、全て無視された結果として、ここでは便宜上 0 や最小値とするか、入力の性質に依存する。
            // ここでは、有効な数値が見つからなかった場合は count=0 とし、maxにはデフォルト値（例: 0）を設定するか、問題の意図に従う。
            // 安全策として、数値を読み取れなかった場合は count=0, max=-1 (または最小値) とする。ここでは最も安全な「最大値が存在しない」ことを示すため、0とする。
            System.out.println("count=0 max=0");
        } else {
            // 少なくとも一つの整数が見つかった場合
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
