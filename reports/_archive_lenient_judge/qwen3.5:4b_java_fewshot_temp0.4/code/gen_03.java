import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        Set<Integer> uniqueNumbers = new HashSet<>();
        long sum = 0;
        
        if (line != null && !line.isEmpty()) {
            for (String part : line.split(",")) {
                int num = Integer.parseInt(part.trim());
                uniqueNumbers.add(num);
                sum += num;
            }
        }
        
        System.out.println("count=" + uniqueNumbers.size() + " sum=" + sum);
    }
}
