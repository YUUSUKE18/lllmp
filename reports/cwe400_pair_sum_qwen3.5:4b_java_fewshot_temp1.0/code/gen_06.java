import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        long target;
        if (targetLine == null || !isInteger(targetLine.trim())) {
            System.out.println("pairs=0");
            return;
        }
        try {
            target = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }

        Set<Long> seen = new HashSet<>();
        int count = 0;
        long accumulatedSum = 0;
        
        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                break; // EOF or only empty lines left
            }

            try {
                long val = Long.parseLong(line.trim());
                accumulatedSum += val;

                // Check if the complement exists in the seen set
                long complement = target - val;
                if (seen.contains(complement)) {
                    count++;
                }

                seen.add(val);
            } catch (NumberFormatException e) {
                // Ignore lines that are not integers
            }
        }
        
        System.out.println("pairs=" + count);
    }

    private static boolean isInteger(String s) {
        if (s == null || s.trim().isEmpty()) {
            return false;
        }
        try {
            Long.parseLong(s.trim());
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
