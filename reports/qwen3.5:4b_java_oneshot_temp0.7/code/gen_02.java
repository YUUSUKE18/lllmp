import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        Set<Integer> distinctNumbers = new HashSet<>();
        long sum = 0;
        
        if (line != null && !line.isEmpty()) {
            String[] parts = line.split(",");
            for (String part : parts) {
                int n = Integer.parseInt(part.trim());
                distinctNumbers.add(n);
                sum += n;
            }
        }
        
        System.out.println("count=" + distinctNumbers.size() + " sum=" + sum);
    }
}
