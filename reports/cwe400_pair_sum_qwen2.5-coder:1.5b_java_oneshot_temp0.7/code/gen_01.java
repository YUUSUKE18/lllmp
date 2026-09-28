import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        BigInteger target = new BigInteger(line.trim());
        int count = 0;
        boolean first = true;
        boolean second = false;
        BigInteger firstValue = null;
        BigInteger secondValue = null;
        String secondLine = "";
        while ((secondLine = br.readLine()) != null) {
            for (String f : secondLine.trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    BigInteger n = new BigInteger(f);
                    if (first) {
                        firstValue = n;
                        first = false;
                    } else if (second) {
                        secondValue = n;
                        second = false;
                        count += firstValue.compareTo(secondValue) == 0 ? 1 : 0;
                    } else {
                        first = true;
                        second = true;
                        firstValue = secondValue = n;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
