import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、実際に読み取れた整数を格納する
        String line1 = br.readLine();
        int expectedCount = 0;
        if (line1 != null) {
            try {
                expectedCount = Integer.parseInt(line1.trim());
            } catch (NumberFormatException e) {
                // 1行目が整数でない場合は、読み取れた数なしとして処理を終了する
                System.out.println("count=0 sum=0");
                return;
            }
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
                // 整数として解釈を試みる
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
