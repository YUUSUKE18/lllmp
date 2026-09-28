import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String lineCountLine = br.readLine();
        if (lineCountLine == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        int declaredCount = 0;
        try {
            declaredCount = Integer.parseInt(lineCountLine.trim());
        } catch (NumberFormatException e) {
            declaredCount = 0; // Ignored if invalid, treat as 0 actual count logic doesn't change much for empty input but we just read what exists
        }

        int[] counts = new int[100000];
        String nextLine;
        int readIndex = 0;
        
        while ((nextLine = br.readLine()) != null) {
            try {
                if (nextLine.trim().isEmpty()) continue; // Ignore empty lines
                
                long val = Long.parseLong(nextLine); // Use long for safety with 64-bit integers, though sum will be int per spec constraint "range of 64bit integer" likely implies value fits in int but safer to parse as long then sum
                counts[readIndex] = val;
                readIndex++;
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be interpreted as integers
            }
        }

        int actualCount = readIndex;
        int sum = 0;
        for (int i = 0; i < actualCount; i++) {
            sum += counts[i];
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
