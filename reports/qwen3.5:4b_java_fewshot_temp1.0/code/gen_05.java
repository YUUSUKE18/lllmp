import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> distinctNumbers = new HashSet<>();
        String[] parts = line.split(",");
        long sum = 0;

        for (String part : parts) {
            int n;
            try {
                n = Integer.parseInt(part.trim());
                if (!distinctNumbers.add(n)) continue; // Already added, skip
                sum += n;
            } catch (NumberFormatException e) {
                continue; // Ignore non-integer elements
            }
        }

        System.out.println("count=" + distinctNumbers.size() + " sum=" + sum);
    }
}
