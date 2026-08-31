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

        while (true) {
            String line = br.readLine();
            if (line == null) break;

            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                try {
                    long value = Long.parseLong(st.nextToken());
                    count++;
                    sum += value;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
