import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、期待される整数個数を取得
        String line1 = br.readLine();
        int expectedCount = 0;
        if (line1 != null) {
            try {
                expectedCount = Integer.parseInt(line1.trim());
            } catch (NumberFormatException e) {
                // 1行目が整数でない場合は、読み取れた整数個数を0とする
                expectedCount = 0;
            }
        }

        long actualSum = 0;
        int actualCount = 0;

        // 2行目以降を読み込み、整数を処理
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // 空行は無視
            }

            try {
                // 行ごとに整数を読み込む (仕様上、1行に1個ずつ並ぶ)
                long number = Long.parseLong(trimmedLine);
                actualSum += number;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 実際に読み取れた個数と合計を1行で出力
        System.out.println("count=" + actualCount + " sum=" + actualSum);
    }
}
