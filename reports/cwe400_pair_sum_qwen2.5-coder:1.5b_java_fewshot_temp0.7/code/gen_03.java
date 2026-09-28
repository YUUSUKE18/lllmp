import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BigInteger goal = new BigInteger(br.readLine());
        int pairs = 0;
        BigInteger sum = BigInteger.ZERO;
        boolean first = true;
        if (br.readLine() != null) {
            while ((br.readLine() != null)) {
                String f = br.readLine();
                if (f.isEmpty()) continue;
                BigInteger n = new BigInteger(f);
                sum = sum.add(n);
                if (first) {
                    first = false;
                    continue;
                }
                if (sum.compareTo(goal) == 0) {
                    pairs++;
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
