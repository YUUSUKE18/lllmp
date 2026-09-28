import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目: 期待される整数の個数 (ここでは読み飛ばす、実際に読み取れた数を数えるため)
        String line1 = br.readLine();
        int expectedCount = 0;
        if (line1 != null) {
            try {
                expectedCount = Integer.parseInt(line1.trim());
            } catch (NumberFormatException e) {
                // 1行目が整数でなかった場合は、後続の処理も無視する可能性があるが、
                // 仕様に従い、これ以降の読み込みを続行する
            }
        }

        long sum = 0;
        int actualCount = 0;

        // 2行目以降の整数を読み込む
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // 空行は無視
            }

            try {
                // 整数として解釈を試みる
                long number = Long.parseLong(trimmedLine);
                sum += number;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 最終結果を出力
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
