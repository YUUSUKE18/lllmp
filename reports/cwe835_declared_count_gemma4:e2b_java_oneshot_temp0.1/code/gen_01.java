import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、実際に読み取れた個数を格納する
        String countLine = br.readLine();
        int actualCount = 0;
        if (countLine != null) {
            try {
                actualCount = Integer.parseInt(countLine.trim());
            } catch (NumberFormatException e) {
                // 1行目が整数でない場合は、読み取れた個数を0とする（またはエラー処理）
                // 仕様に従い、読み取れた整数のみを対象とするため、ここでは読み取れた個数を0として扱う
                actualCount = 0;
            }
        }

        long sum = 0;
        int readCount = 0;

        // 2行目以降を読み込み、整数を処理する
        String line;
        while ((line = br.readLine()) != null) {
            // 空行は無視
            if (line.trim().isEmpty()) {
                continue;
            }
            
            // 整数として解釈を試みる
            try {
                // 1行目の値が実際に読み取れた個数と一致しない可能性があるため、
                // 読み取れた行をすべて対象とする
                long number = Long.parseLong(line.trim());
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
