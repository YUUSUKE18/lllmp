import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int countFromFirstLine;
        try {
            countFromFirstLine = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            countFromFirstLine = 0;
        }

        long sum = 0;
        int actualCount = 0;
        
        while ((line1 = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line1);
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                try {
                    long val = Long.parseLong(token);
                    sum += val;
                    actualCount++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
        }
        
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
