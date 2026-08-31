import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        BigInteger countBi = BigInteger.ZERO;
        BigInteger sumBi = BigInteger.ZERO;
        int currentVal = 0;
        int count = 0;
        boolean foundValue = false;

        for (String part : line.split(",")) {
            String[] segments = part.trim().split(":");
            if (segments.length != 2) continue;

            String valStr = segments[0].trim();
            String countStr = segments[1].trim();

            try {
                currentVal = Integer.parseInt(valStr);
                int c = Integer.parseInt(countStr);
                
                for (int i = 0; i < c; i++) {
                    countBi = countBi.add(BigInteger.valueOf(currentVal));
                    sumBi = sumBi.add(BigInteger.valueOf(currentVal));
                    count++;
                }
                foundValue = true;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("count=" + count + " sum=" + sumBi.toString());
    }
}
