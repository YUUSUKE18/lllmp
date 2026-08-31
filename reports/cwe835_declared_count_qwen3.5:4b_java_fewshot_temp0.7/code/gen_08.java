import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String firstLine = br.readLine();
        if (firstLine == null || firstLine.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        int expectedCount = 0;
        try {
            expectedCount = Integer.parseInt(firstLine.trim());
        } catch (NumberFormatException e) {
            // 1 行目が整数でない場合、読み取れる整数の個数は 0
            System.out.println("count=0 sum=0");
            return;
        }

        long sum = 0;
        int count = 0;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(line.trim());
                sum += n;
                count++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
