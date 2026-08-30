import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String countLine = br.readLine();
        if (countLine == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int actualCount = 0;
        long sum = 0;
        
        String line;
        // 2行目以降を読み込む
        while ((line = br.readLine()) != null) {
            // 空行は無視
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                // 整数として解釈を試みる
                long number = Long.parseLong(line.trim());
                sum += number;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        // 厳密に count=<実際に読み取れた個数> sum=<合計> を出力
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
