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
        
        int actualCount;
        try {
            actualCount = Integer.parseInt(countLine.trim());
        } catch (NumberFormatException e) {
            // 最初の行が不正な場合、読み取れた個数を0として処理する（あるいは仕様に従いエラーとするが、ここでは安全策として0とする）
            System.out.println("count=0 sum=0");
            return;
        }
        
        long sum = 0;
        int actualReadCount = 0;
        String line;
        
        // 2行目以降を読み込む
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            try {
                long number = Long.parseLong(trimmedLine);
                sum += number;
                actualReadCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            }
        }
        
        System.out.println("count=" + actualReadCount + " sum=" + sum);
    }
}
