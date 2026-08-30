import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        // カンマで分割して整数列を取得
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
                // 64bit整数の範囲に収まることを確認しつつ読み込む
                long value = Long.parseLong(trimmedPart);
                count++;
                if (value > maxValue) {
                    maxValue = value;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        // 読み込んだ数があれば結果を出力。数値が全くなかった場合は count=0 max=0 となる
        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else if (line.trim().isEmpty()) {
             // 入力が空文字列だった場合（上記で処理済みだが念のため）
            System.out.println("count=0 max=0");
        } else {
            // 数字が含まれていなかった場合も、仕様に従って count=0 max=0 を出力する方が自然かもしれないが、
            // 読み込んだ数値のみを対象とするため、もし数字が一つもなければ count=0 max=0 とするのが適切。
             System.out.println("count=0 max=0");
        }
    }
}
