import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        long count = 0;
        long sum = 0;
        
        StringTokenizer st = new StringTokenizer(line);
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            int colonIndex = token.indexOf(':');
            if (colonIndex <= 0) continue;

            try {
                String valueStr = token.substring(0, colonIndex).trim();
                String countStr = token.substring(colonIndex + 1).trim();

                long value = Long.parseLong(valueStr);
                long repeat = Long.parseLong(countStr);

                count += repeat;
                sum += value * repeat;
            } catch (NumberFormatException e) {
                // 形式が間違っている場合は無視
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
