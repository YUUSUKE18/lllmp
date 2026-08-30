import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=-1"); // 空入力の場合の処理（最大値は定義されないため、ここでは-1など適切な値とする）
            return;
        }

        // カンマで分割し、各要素を整数に変換する
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
            // 整数が一つもなかった場合
            System.out.println("count=0 max=-1"); // または問題の仕様に従って適切な値を出力。ここでは最大値が存在しないことを示すために-1とする。
        } else {
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
