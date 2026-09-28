import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目: 読み取れた整数個数
        String firstLine = br.readLine();
        if (firstLine == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        int expectedCount;
        try {
            expectedCount = Integer.parseInt(firstLine.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は、読み取った整数は0として処理を終了
            System.out.println("count=0 sum=0");
            return;
        }

        long sum = 0;
        int actualCount = 0;

        // 2行目以降を読み込む
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // 空行は無視
            }
            
            try {
                long number = Long.parseLong(trimmedLine);
                sum += number;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 結果を出力
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
