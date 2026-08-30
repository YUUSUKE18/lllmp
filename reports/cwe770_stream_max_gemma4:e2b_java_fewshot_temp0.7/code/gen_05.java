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
        long count = 0;
        long maxVal = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
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
                    // 整数として解釈できない場合は無視する
                }
            }
        }

        if (count == 0) {
            // 整数が見つからなかった場合、maxは定義されないが、仕様に従い適切な値を出力する。
            // 空の入力や全て無効な入力の場合、最大値を0とするのが安全かもしれないが、
            // ここでは読み込まれた有効な数がない場合の振る舞いを考慮し、
            // 読み込んだ数値が存在しない場合は max=0 としても良いが、
            // 厳密には「存在する整数の最大値」を求めるため、
            // 読み込んだ要素があるのにすべて無効だった場合は max の初期値に依存する。
            // 例として、入力がない場合や全て無視された場合は count=0, max=0 とする。
             System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
