import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        
        String[] tokens = line.split(",");
        Set<Integer> set = new HashSet<>();
        long sum = 0;
        
        for (String token : tokens) {
            if (token.trim().isEmpty()) continue;
            try {
                int num = Integer.parseInt(token.trim());
                set.add(num);
                sum += num;
            } catch (NumberFormatException e) {
            }
        }
        
        System.out.println("count=" + set.size() + " sum=" + sum);
    }
}
