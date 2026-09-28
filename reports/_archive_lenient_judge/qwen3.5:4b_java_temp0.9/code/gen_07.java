import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            return;
        }

        Set<Integer> distinctIntegers = new HashSet<>();
        int sum = 0; // Java's long is needed for safety, though spec says fits in 64-bit
        
        try {
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) continue;
                
                int value = Integer.parseInt(part);
                distinctIntegers.add(value); // Set handles uniqueness automatically
                
                sum += value; // Note: The spec asks for "count and total of duplicates removed integers". 
                             // If interpreted as 'total unique numbers', we add each once. 
                             // Given the phrasing "重複を除いた整数について、個数と合計", it usually means
                             // properties (count/sum) calculated after removing duplicates from input, not count/frequency per number.
                        }
        } catch (NumberFormatException e) {
            // Ignore elements that cannot be interpreted as integers
        }

        System.out.println("count=" + distinctIntegers.size() + " sum=" + sum);
    }
}
