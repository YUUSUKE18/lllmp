import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
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
            System.out.println("count=0 sum=0");
            return;
        }

        long sum = 0;
        int actualCount = 0;

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                break;
            }

            try {
                StringTokenizer st = new StringTokenizer(line);
                while (st.hasMoreTokens()) {
                    String token = st.nextToken();
                    try {
                        long n = Long.parseLong(token);
                        sum += n;
                        actualCount++;
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視
                    }
                }
            } catch (Exception e) {
                // 解析エラーが発生した場合も無視して次の行へ
            }
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
