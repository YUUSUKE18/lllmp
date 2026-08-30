import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、期待される個数を取得
        String firstLine = br.readLine();
        if (firstLine == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int expectedCount;
        try {
            expectedCount = Integer.parseInt(firstLine.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は、読み取れた数がないとみなすか、仕様に従う。
            // ここでは、最初の行が不正な場合は0として処理を進める（読み取れた整数がないため）
            expectedCount = 0;
        }
        
        long sum = 0;
        int actualCount = 0;
        
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
