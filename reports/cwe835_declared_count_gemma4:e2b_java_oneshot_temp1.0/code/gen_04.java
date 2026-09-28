import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込む
        String lineCount = br.readLine();
        int expectedCount = 0;
        try {
            if (lineCount != null) {
                expectedCount = Integer.parseInt(lineCount.trim());
            }
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は、読み取れた個数を 0 とする
            expectedCount = 0;
        }

        long sum = 0;
        int actualCount = 0;

        // 2行目以降を読み込む
        String line;
        while ((line = br.readLine()) != null) {
            // 行が空でないかチェックし、トークン化する
            if (line.trim().isEmpty()) {
                continue;
            }
            
            StringTokenizer st = new StringTokenizer(line);
            
            // 行に含まれるすべてのトークンを整数として試す
            while (st.hasMoreTokens()) {
                try {
                    long n = Long.parseLong(st.nextToken());
                    sum += n;
                    actualCount++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できないトークンは無視する
                }
            }
        }

        // 実際に読み取れた個数と合計を出力する
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
