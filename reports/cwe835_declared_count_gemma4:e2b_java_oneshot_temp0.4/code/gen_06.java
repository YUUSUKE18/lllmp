import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目: 続く整数の個数
        String countLine = br.readLine();
        if (countLine == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        int expectedCount;
        try {
            expectedCount = Integer.parseInt(countLine.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は、読み取れた個数を0として扱う（仕様上、1行目は個数だが、読み取れなかった場合は0として処理）
            expectedCount = 0;
        }

        List<Long> numbers = new ArrayList<>();
        long sum = 0;
        int actualReadCount = 0;

        // 2行目以降を読み込む
        String line;
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
            }
        }

        // 最終的な出力
        System.out.println("count=" + actualReadCount + " sum=" + sum);
    }
}
