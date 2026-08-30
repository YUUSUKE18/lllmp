import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        Set<Integer> uniqueNumbers = new HashSet<>();
        if (line != null && !line.trim().isEmpty()) {
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty() || !isNumeric(part)) continue;
                int num = Integer.parseInt(part);
                uniqueNumbers.add(num);
            }
        }
        
        long totalSum = 0;
        int count = uniqueNumbers.size();
        for (int num : uniqueNumbers) {
            totalSum += num;
        }
        
        System.out.println("count=" + count + " sum=" + totalSum);
    }

    private static boolean isNumeric(String s) {
        try {
            int n = Integer.parseInt(s);
            return String.valueOf(n).equals(s);
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
