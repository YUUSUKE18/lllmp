import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> distinctIntegers = new HashSet<>();
        String[] parts = line.trim().split(",");

        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;

            try {
                int number = Integer.parseInt(part);
                distinctIntegers.add(number);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        long sum = 0L;
        for (int num : distinctIntegers) {
            sum += num;
        }

        int count = distinctIntegers.size();
        System.out.println("count=" + count + " sum=" + sum);
    }
}
