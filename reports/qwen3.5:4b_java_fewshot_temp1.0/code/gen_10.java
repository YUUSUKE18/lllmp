import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> uniqueIntegers = new HashSet<>();
        for (String token : line.split(",")) {
            token = token.trim();
            if (token.isEmpty()) continue;
            try {
                int n = Integer.parseInt(token);
                uniqueIntegers.add(n);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        long count = uniqueIntegers.size();
        BigInteger sum = BigInteger.ZERO;
        for (Integer num : uniqueIntegers) {
            sum = sum.add(BigInteger.valueOf(num));
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
