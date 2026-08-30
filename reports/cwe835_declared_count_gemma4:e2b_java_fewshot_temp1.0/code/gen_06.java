import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String firstLine = br.readLine();
        if (firstLine == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        int expectedCount;
        try {
            expectedCount = Integer.parseInt(firstLine.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は、読み取れた個数を0として扱うか、エラー処理が必要だが、
            // 仕様上は1行目に整数が書かれていることを前提とする。
            // ここでは、もし1行目が不正なら、読み取れたデータがないとみなし0とする。
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
                continue;
            }
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
