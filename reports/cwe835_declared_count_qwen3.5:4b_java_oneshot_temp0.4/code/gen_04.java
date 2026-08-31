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

        int countLine;
        try {
            countLine = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            System.out.println("count=0 sum=0");
            return;
        }

        long sum = 0;
        int actualCount = 0;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                StringTokenizer st = new StringTokenizer(line);
                while (st.hasMoreTokens()) {
                    long val = Long.parseLong(st.nextToken());
                    sum += val;
                    actualCount++;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行の要素は無視
            }
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
