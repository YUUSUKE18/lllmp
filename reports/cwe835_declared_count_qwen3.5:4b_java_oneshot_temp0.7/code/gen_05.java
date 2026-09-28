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

        int countInput;
        try {
            countInput = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            countInput = 0;
        }

        long sum = 0;
        int actualCount = 0;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                try {
                    long n = Long.parseLong(st.nextToken());
                    sum += n;
                    actualCount++;
                } catch (NumberFormatException e) {
                    // 解析エラーは無視（仕様通り）
                }
            }
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
