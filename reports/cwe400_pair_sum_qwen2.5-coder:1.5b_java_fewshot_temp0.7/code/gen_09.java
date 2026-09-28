import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        BigInteger target = new BigInteger(line);
        List<BigInteger> numbers = new ArrayList<>();
        int pairs = 0;
        while ((line = br.readLine()) != null) {
            if (line.isEmpty()) continue;
            try {
                BigInteger n = new BigInteger(line);
                numbers.add(n);
                if (numbers.size() >= 2) {
                    BigInteger sum = numbers.get(0).add(numbers.get(1));
                    if (sum.equals(target)) {
                        pairs++;
                    }
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
