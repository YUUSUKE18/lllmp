import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、整数としてパース
        String countLine = br.readLine();
        int expectedCount = 0;
        if (countLine != null) {
            try {
                expectedCount = Integer.parseInt(countLine.trim());
            } catch (NumberFormatException e) {
                // 1行目が整数でない場合は、読み取れた個数を0として扱う
                expectedCount = 0;
            }
        }

        long sum = 0;
        int actualCount = 0;
        String line;

        // 2行目以降を読み込み、整数を処理
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue; // 空行は無視
            }

            try {
                // 行全体をトークン化して整数を試みる
                String[] tokens = line.trim().split("\\s+");
                for (String token : tokens) {
                    if (!token.isEmpty()) {
                        long number = Long.parseLong(token);
                        sum += number;
                        actualCount++;
                    }
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行（またはトークン）は無視
            }
        }

        // 実際に読み取れた個数と合計を出力
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
