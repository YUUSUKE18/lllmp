import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String firstLine = br.readLine();
        if (firstLine == null || firstLine.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        try {
            int n = Integer.parseInt(firstLine.trim());
        } catch (NumberFormatException e) {
            System.out.println("count=0 sum=0");
            return;
        }

        long count = 0;
        long sum = 0;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                StringTokenizer st = new StringTokenizer(line);
                while (st.hasMoreTokens()) {
                    String token = st.nextToken();
                    try {
                        long val = Long.parseLong(token);
                        count++;
                        sum += val;
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視
                    }
                }
            } catch (Exception e) {
                continue;
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
