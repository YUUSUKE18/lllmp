import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String firstLine = br.readLine();
        if (firstLine == null || firstLine.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        int n;
        try {
            n = Integer.parseInt(firstLine.trim());
        } catch (NumberFormatException e) {
            n = 0;
        }

        long sum = 0L;
        int count = 0;

        while ((firstLine = br.readLine()) != null) {
            if (firstLine.isEmpty()) continue;
            StringTokenizer st = new StringTokenizer(firstLine);
            while (st.hasMoreTokens()) {
                try {
                    String token = st.nextToken();
                    long val = Long.parseLong(token);
                    sum += val;
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
