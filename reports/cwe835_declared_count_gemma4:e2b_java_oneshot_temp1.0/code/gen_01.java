import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目: 続く整数の個数が書かれている
        String line1 = br.readLine();
        if (line1 == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int expectedCount;
        try {
            expectedCount = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は、読み取れた個数を0として処理する（またはエラーとして扱うが、ここでは無視して続行）
            System.out.println("count=0 sum=0");
            return;
        }

        long sum = 0;
        int actualCount = 0;
        
        String line;
        // 2行目以降を読み込む
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            try {
                // 整数として解釈を試みる
                long number = Long.parseLong(trimmedLine);
                sum += number;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            }
        }
        
        // 実際に読み取れた個数と合計を出力
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
