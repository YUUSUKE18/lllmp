import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、整数としてパース
        String countLine = br.readLine();
        int actualCount = 0;
        if (countLine != null) {
            try {
                actualCount = Integer.parseInt(countLine.trim());
            } catch (NumberFormatException e) {
                // 1行目が不正な場合は、読み取れた個数を0として扱う（仕様上、1行目は個数だが、読み取れない場合は0とする）
                actualCount = 0;
            }
        }

        long sum = 0;
        int readCount = 0;

        // 2行目以降を読み込み、整数を処理
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
                readCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 実際に読み取れた個数と合計を出力
        System.out.println("count=" + readCount + " sum=" + sum);
    }
}
