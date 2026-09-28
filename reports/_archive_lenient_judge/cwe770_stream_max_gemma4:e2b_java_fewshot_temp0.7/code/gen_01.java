import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;

        if (line != null) {
            // カンマで分割
            String[] parts = line.split(",");

            for (String part : parts) {
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) {
                    continue;
                }

                try {
                    long n = Long.parseLong(trimmedPart);
                    if (first) {
                        max = n;
                        count = 1;
                        first = false;
                    } else {
                        count++;
                        if (n > max) {
                            max = n;
                        }
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        // 要素が一つもなかった場合は count=0, maxの初期値（ここではMIN_VALUEだが、実際には何も出力しないか、仕様に合わせる）
        if (count == 0) {
            // 空の入力または数値がない場合は count=0, maxは問題ない。
            // ただし、もし入力が空文字列だった場合も考慮し、maxを適切に設定する必要がある。
            // このケースでは、要素が存在しないため、ここでは最大値を出力しない（または特別な値を出す）のが自然だが、
            // 設問の意図に従い、読み込んだ有効な要素に基づいて出力する。
            // count=0 の場合、maxは無効になるため、count=0, max=0 などと見なすか、単に何も出力しない選択肢もあるが、
            // 例に合わせて「count=<個数> max=<最大値>」を必ず出力する。
            // 数値がない場合は count=0, max=? となるが、ここでは読み込んだ有効な要素のみを考慮し、
            // 最初の要素があればそれを基準とする。もし何も数値が読み込まれなかった場合、count=0となる。
            // 空の入力に対する処理として、count=0, max=0 とする（またはMIN_VALUEだが、通常は0）。
             if (line != null && line.trim().isEmpty()) {
                 System.out.println("count=0 max=0");
             } else if (count == 0) {
                // 数値が存在しない場合、maxは不定。ここでは安全のため 0 とする。
                System.out.println("count=0 max=0");
             }
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
