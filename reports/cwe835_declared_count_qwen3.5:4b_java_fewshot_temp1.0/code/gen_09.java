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

        int declaredCount;
        try {
            StringTokenizer st1 = new StringTokenizer(line1);
            if (!st1.hasMoreTokens()) {
                System.out.println("count=0 sum=0");
                return;
            }
            declaredCount = Integer.parseInt(st1.nextToken());
        } catch (NumberFormatException e) {
            System.out.println("count=0 sum=0");
            return;
        }

        int count = 0;
        long sum = 0; // 64bit integer fits in long
        String line2;

        while ((line2 = br.readLine()) != null) {
            if (line2.trim().isEmpty()) continue;

            StringTokenizer st = new StringTokenizer(line2);
            while (st.hasMoreTokens()) {
                try {
                    long val = Long.parseLong(st.nextToken());
                    sum += val;
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できないトークルは無視
                }
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
