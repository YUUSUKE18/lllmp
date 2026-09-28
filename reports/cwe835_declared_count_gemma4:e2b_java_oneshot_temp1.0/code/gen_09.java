import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、続く整数の個数（期待値）を取得
        String countLine = br.readLine();
        if (countLine == null || countLine.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int expectedCount;
        try {
            expectedCount = Integer.parseInt(countLine.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は、読み取れた整数を0として扱うか、エラー処理（ここでは0として扱う）
            expectedCount = 0;
        }

        long sum = 0;
        int actualCount = 0;

        String line;
        // 2行目以降を読み込む
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // 空行は無視
            }

            try {
                // 行に含まれる全てのスペース区切りの数値を読み取る
                StringTokenizer st = new StringTokenizer(trimmedLine);
                while (st.hasMoreTokens()) {
                    long num = Long.parseLong(st.nextToken());
                    sum += num;
                    actualCount++;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない値は無視
            }
        }

        // 実際に読み取れた個数と合計を出力
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
