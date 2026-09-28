import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line1 = br.readLine();
        if (line1 == null || line1.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int expectedCount;
        try {
            expectedCount = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は、読み取れた個数を0として処理する
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

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
