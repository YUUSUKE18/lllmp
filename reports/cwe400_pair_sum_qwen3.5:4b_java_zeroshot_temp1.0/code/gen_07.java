import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long target = Long.parseLong(targetLine.trim());
        Map<Long, Integer> frequencyMap = new HashMap<>();
        long currentSum = 0;
        int count = 0;
        
        for (String line = br.readLine(); line != null; line = br.readLine()) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            
            try {
                long num = Long.parseLong(line);
                
                if (frequencyMap.containsKey(target - num)) {
                    int countOfComplement = frequencyMap.get(target - num);
                    long numCount = frequencyMap.getOrDefault(num, 0L);
                    if (countOfComplement > 0 && numCount > 0) {
                        // もし目標値が num と同じの場合
                        if (target == num) {
                            count += (long) countOfComplement * (numCount - 1);
                        } else {
                            long totalPossible = (long) countOfComplement * numCount;
                            count += totalPossible;
                        }
                    }
                }
                
                currentSum += num; // This line is actually not needed for the algorithm logic but keeps track if needed. Actually, we don't need sum of all numbers, just pairs.
                
                frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
            } catch (NumberFormatException e) {
                continue; // Ignore lines that cannot be interpreted as integers
            }
        }

        System.out.println("pairs=" + count);
    }
}
