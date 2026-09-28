import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;

        // 1行目を読み込む
        if ((line = br.readLine()) == null) {
            // 入力が空の場合は終了
            return;
        }

        int expectedCount;
        try {
            expectedCount = Integer.parseInt(line.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は処理を終了（仕様上、1行目は整数と仮定されるが、安全のため）
            return;
        }

        long sum = 0;
        int actualCount = 0;

        // 2行目以降を読み込む
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は無視
                continue;
            }

            try {
                // 整数として解釈を試みる
                long number = Long.parseLong(trimmedLine);
                sum += number;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // 厳密に count=<実際に読み取れた個数> sum=<合計> を出力する
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
