import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、整数としてパースする
        String countLine = br.readLine();
        if (countLine == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int expectedCount = 0;
        try {
            expectedCount = Integer.parseInt(countLine.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は、読み取れた個数を0として扱う（仕様上は1行目は整数と仮定されるが、安全策として）
            expectedCount = 0;
        }

        long sum = 0;
        int actualCount = 0;

        // 2行目以降を読み込み、整数を処理する
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // 空行は無視
            }

            try {
                // 読み取れた整数を処理
                long number = Long.parseLong(trimmedLine);
                sum += number;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 実際に読み取れた個数と合計を出力
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
