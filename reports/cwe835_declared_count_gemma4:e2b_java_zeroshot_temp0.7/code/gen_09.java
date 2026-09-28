import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1行目を読み取り、実際に存在する整数の個数を把握する
        String firstLine = br.readLine();
        if (firstLine == null || firstLine.trim().isEmpty()) {
            // 入力がない場合は終了
            return;
        }
        
        int expectedCount;
        try {
            expectedCount = Integer.parseInt(firstLine.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でなかった場合、処理を続行しない（仕様上は1行目は整数と仮定されるが、安全策として）
            return;
        }

        List<Long> numbers = new ArrayList<>();
        long sum = 0;
        int actualReadCount = 0;

        String line;
        // 2行目以降を読み取り、整数を収集する
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // 空行は無視
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

        // 仕様に従い、実際に読み取れた個数と合計を出力する
        System.out.println("count=" + actualReadCount + " sum=" + sum);
    }
}
