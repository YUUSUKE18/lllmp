import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line1 = br.readLine();
        int countSpecified = 0;
        if (line1 != null && !line1.trim().isEmpty()) {
            try {
                countSpecified = Integer.parseInt(line1.trim());
            } catch (NumberFormatException e) {
                // 行1に整数がなければ、0とみなし処理を続ける
            }
        } else {
            // 入力がない場合は count=0, sum=0
            System.out.println("count=0 sum=0");
            return;
        }

        long sum = 0;
        int actualCount = 0;

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) break; // 入力終了または空行
        
            try {
                StringTokenizer st = new StringTokenizer(line);
                while (st.hasMoreTokens()) {
                    String token = st.nextToken();
                    try {
                        long value = Long.parseLong(token);
                        sum += value;
                        actualCount++;
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視
                    }
                }
            } catch (Exception e) {
                // 行の処理に問題があった場合でも次のループに進む
            }
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
