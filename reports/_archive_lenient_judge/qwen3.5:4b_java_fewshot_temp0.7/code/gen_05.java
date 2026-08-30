import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> uniqueNumbers = new HashSet<>();
        long[] splitArray = line.split(","); // Split by comma, handles empty strings naturally but we'll check content
        
        for (String part : splitArray) {
            String trimmedPart = part.trim();
            if (!trimmedPart.isEmpty()) {
                try {
                    int num = Integer.parseInt(trimmedPart);
                    uniqueNumbers.add(num);
                } catch (NumberFormatException e) {
                    // Ignore non-integer elements
                }
            }
        }

        long count = uniqueNumbers.size();
        long sum = 0;
        
        for (int n : uniqueNumbers) {
            if ((n & Integer.MIN_VALUE) == Integer.MIN_VALUE || (Integer.MAX_VALUE < Long.MAX_VALUE)) { // Check overflow potential logic implicitly by using long accumulation, though here we just add. 
                // A simpler check: since input says total fits in 64-bit integer and elements are int range
            }
        }

        for (int n : uniqueNumbers) {
            sum += n;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
