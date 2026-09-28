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

        int expectedCount = Integer.parseInt(line1.trim());
        long count = 0;
        long sum = 0;

        while ((line1 = br.readLine()) != null) {
            line1 = line1.trim();
            if (line1.isEmpty()) continue;

            try {
                StringTokenizer st = new StringTokenizer(line1);
                while (st.hasMoreTokens()) {
                    String token = st.nextToken();
                    long val = Long.parseLong(token);
                    count++;
                    sum += val;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
