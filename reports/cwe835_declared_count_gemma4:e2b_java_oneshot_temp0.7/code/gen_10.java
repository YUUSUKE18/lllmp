import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込む
        String line = br.readLine();
        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int expectedCount;
        try {
            expectedCount = Integer.parseInt(line.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は、読み取れた数がないと見なす（あるいは仕様に従うが、ここでは0とする）
            System.out.println("count=0 sum=0");
            return;
        }

        long sum = 0;
        int actualCount = 0;
        
        // 2行目以降を読み込む
        String nextLine;
        while ((nextLine = br.readLine()) != null) {
            String trimmedLine = nextLine.trim();
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
