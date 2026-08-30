import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1行目: 続く整数の個数が書かれている
        String countLine = br.readLine();
        if (countLine == null || countLine.trim().isEmpty()) {
            // 最初の行が空の場合は処理終了
            return;
        }
        
        int expectedCount;
        try {
            expectedCount = Integer.parseInt(countLine.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は処理終了（仕様上、問題発生時の具体的な指示はないが、堅牢性のため）
            return;
        }

        List<Long> numbers = new ArrayList<>();
        long sum = 0;
        int actualReadCount = 0;

        // 2行目以降を読み込む
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

        // 仕様に基づき、実際に読み取れた個数と合計を出力する
        System.out.println("count=" + actualReadCount + " sum=" + sum);
    }
}
