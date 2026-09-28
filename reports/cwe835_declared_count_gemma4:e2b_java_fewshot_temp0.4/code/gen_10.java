import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line1 = br.readLine();
        if (line1 == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int expectedCount;
        try {
            expectedCount = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は、読み取れた整数を0として扱うか、エラー処理を行うが、
            // 仕様に従い、読み取れた整数のみを対象とするため、ここでは読み取れなかったと見なすか、
            // 読み取れた整数が0個とみなす。
            System.out.println("count=0 sum=0");
            return;
        }

        long sum = 0;
        int actualCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            try {
                long number = Long.parseLong(trimmedLine);
                sum += number;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            }
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
