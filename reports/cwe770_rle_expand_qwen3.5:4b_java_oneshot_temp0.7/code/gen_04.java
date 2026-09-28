import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        long count = 0;
        BigInteger sum = BigInteger.ZERO;

        StringTokenizer st = new StringTokenizer(line);
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            if (!token.contains(":")) continue;

            int colonIndex = token.indexOf(':');
            String valStr = token.substring(0, colonIndex);
            String countStr = token.substring(colonIndex + 1);

            try {
                long value = Long.parseLong(valStr);
                long repetition = Long.parseLong(countStr);
                count += repetition;
                sum = sum.add(BigInteger.valueOf(value)).multiply(BigInteger.valueOf(repetition));
            } catch (NumberFormatException e) {
                // 無視
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
