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
                // 1行目が整数でない場合は、読み取りを終了する（仕様上は想定されないが安全策）
                System.out.println("count=0 sum=0");
                return;
            }
        }

        long actualCount = 0;
        long sum = 0;

        String line;
        // 2行目以降を読み込む
        while ((line = br.readLine()) != null) {
            // 空行は無視
            if (line.trim().isEmpty()) {
                continue;
            }
            
            try {
                // 整数として解析を試みる
                long number = Long.parseLong(line.trim());
                actualCount++;
                sum += number;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 最終結果を出力
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
