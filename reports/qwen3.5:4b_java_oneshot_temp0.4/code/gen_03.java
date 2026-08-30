import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Long> distinctNumbers = new HashSet<>();
        String[] parts = line.split(",");

        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;
            try {
                long n = Long.parseLong(part);
                distinctNumbers.add(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        long count = distinctNumbers.size();
        long sum = 0;
        for (long n : distinctNumbers) {
            sum += n;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
