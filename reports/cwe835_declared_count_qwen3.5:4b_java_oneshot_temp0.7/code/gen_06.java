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

        int countLine = 0;
        try {
            countLine = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            System.out.println("count=0 sum=0");
            return;
        }

        long sum = 0;
        int actualCount = 0;

        String line2;
        while ((line2 = br.readLine()) != null) {
            line2 = line2.trim();
            if (line2.isEmpty()) continue;

            try {
                StringTokenizer st = new StringTokenizer(line2);
                while (st.hasMoreTokens()) {
                    String token = st.nextToken();
                    long val = Long.parseLong(token);
                    sum += val;
                    actualCount++;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行またはトークルは無視
            }
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
