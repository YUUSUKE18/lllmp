import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Set<Long> uniqueNumbers = new HashSet<>();
        String line;
        while ((line = br.readLine()) != null) {
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) {
                    continue;
                }
                try {
                    long num = Long.parseLong(part);
                    uniqueNumbers.add(num);
                } catch (NumberFormatException e) {
                    // Ignore non-integer elements
                }
            }
        }

        long count = uniqueNumbers.size();
        long sum = 0;
        for (long n : uniqueNumbers) {
            sum += n;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
