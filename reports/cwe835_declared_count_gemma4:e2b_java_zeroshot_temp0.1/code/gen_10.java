import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1行目を読み取り、続く整数の個数を取得
        String line1 = br.readLine();
        if (line1 == null || line1.trim().isEmpty()) {
            // 入力が空の場合は終了
            return;
        }
        int expectedCount;
        try {
            expectedCount = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は無視（仕様上は1行目は整数と仮定されるが、安全のため）
            return;
        }

        List<Long> numbers = new ArrayList<>();
        long sum = 0;
        int actualReadCount = 0;

        // 2行目以降を読み取り、整数を収集
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は無視
                continue;
            }

            try {
                long number = Long.parseLong(trimmedLine);
                numbers.add(number);
                sum += number;
                actualReadCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // 最終結果を出力
        System.out.println("count=" + actualReadCount + " sum=" + sum);
    }
}
