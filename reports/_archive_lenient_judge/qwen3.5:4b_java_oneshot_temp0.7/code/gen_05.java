import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        Set<Integer> uniqueNumbers = new HashSet<>();
        long sum = 0L; // Assuming the problem implies we just need to track count, but since duplicates are removed per element? 
                       // Re-reading: "重複を除いた整数" -> Unique integers. Then for those unique integers, calculate how many (count) and what is their total sum (sum).
                       // Wait, if I have 1, 2, 3. Count = 3, Sum = 6. 
                       // If I have 1, 1, 2, 2, 3, 3 -> Unique are {1, 2, 3}. Count = 3 (number of unique types?), or count occurrences?
                       // "重複を除いた整数" means the set of integers without duplicates. 
                       // The phrasing "個数と合計を求めます" usually implies:
                       // If input is A, B, C... and we take {Unique Integers}, then Count = size of Unique Set, Sum = sum of elements in that unique set.
                       
        if (line != null) {
            String[] parts = line.split(",");
            for (String part : parts) {
                // Trim spaces inside the element just in case, though split usually handles around it
                part = part.trim(); 
                if (part.isEmpty()) continue;

                try {
                    int num = Integer.parseInt(part);
                    uniqueNumbers.add(num);
                    sum += num;
                } catch (NumberFormatException e) {
                    // Ignore non-integer elements as per spec "整数として解釈できない要素も無視します"
                }
            }
        }

        System.out.println("count=" + uniqueNumbers.size() + " sum=" + sum);
    }
}
