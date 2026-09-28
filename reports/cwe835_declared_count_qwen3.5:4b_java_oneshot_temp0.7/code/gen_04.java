import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) return;
        
        int countInput = 0;
        try {
            countInput = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            countInput = 0;
        }

        String line2;
        long sum = 0;
        int countRead = 0;

        while ((line2 = br.readLine()) != null) {
            if (line2.trim().isEmpty()) continue;
            
            try {
                StringTokenizer st = new StringTokenizer(line2);
                while (st.hasMoreTokens()) {
                    String token = st.nextToken();
                    try {
                        long val = Long.parseLong(token);
                        sum += val;
                        countRead++;
                        if (countRead == countInput) break;
                    } catch (NumberFormatException e) {
                    }
                }
            } catch (Exception e) {
            }
        }

        System.out.println("count=" + countRead + " sum=" + sum);
    }
}
