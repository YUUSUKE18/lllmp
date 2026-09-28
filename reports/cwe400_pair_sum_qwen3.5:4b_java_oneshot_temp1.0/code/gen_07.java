import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        
        long target = Long.parseLong(targetLine.trim());
        long count = 0;
        HashSet<Long> seen = new HashSet<>();
        HashSet<Long> pairsSoFar = new HashSet<>(); // Stores (i, j) pairs as String "i+j"
        
        // We need to track indices to ensure distinct positions.
        // Since we process line by line, let's store values in a list to calculate differences?
        // Actually, the problem asks for number of PAIRS (two numbers). 
        // Let's collect all valid integers first or process on the fly.
        // Given memory constraints aren't mentioned but "standard input", let's assume reasonable size.
        // We'll store values in a list.
        
        String line;
        ArrayList<Long> numbers = new ArrayList<>();
        
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                long num = Long.parseLong(line);
                numbers.add(num);
            } catch (NumberFormatException e) {
                // Ignore invalid lines
            }
        }
        
        // Two Sum variation: count pairs with sum = target.
        // Use a set to store values we've seen and their indices.
        // Actually, just storing values in a Set isn't enough if duplicates exist.
        // We need to count all unique pairs (indices).
        
        HashSet<Long> valueSet = new HashSet<>();
        long[] counts = new long[(long)target + 1]; // Wait, target can be negative or large? 
        // Use a Map for value frequencies if we need it, but two sum with duplicates:
        // Approach: For each new number x at index i:
        //   needed = target - x.
        //   if seen contains needed, then add count[needed] to total pairs.
        //   increment count[x].
        
        HashMap<Long, Long> frequencyMap = new HashMap<>();
        
        for (int i = 0; i < numbers.size(); i++) {
            long x = numbers.get(i);
            long needed = target - x;
            
            if (frequencyMap.containsKey(needed)) {
                count += frequencyMap.get(needed);
            }
            
            frequencyMap.put(x, frequencyMap.getOrDefault(x, 0L) + 1);
        }
        
        System.out.println("pairs=" + count);
    }
}
