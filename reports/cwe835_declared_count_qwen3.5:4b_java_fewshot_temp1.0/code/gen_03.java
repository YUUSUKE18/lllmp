import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String firstLine = br.readLine();
        int nExpected = 0;
        if (firstLine != null && !firstLine.trim().isEmpty()) {
            try {
                BigInteger val = new BigInteger(firstLine.trim());
                nExpected = val.intValue();
            } catch (NumberFormatException e) {}
        }

        long sum = 0;
        int count = 0;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                BigInteger val = new BigInteger(line.trim());
                long v = val.longValue();
                sum += v;
                count++;
            } catch (NumberFormatException e) {}
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
