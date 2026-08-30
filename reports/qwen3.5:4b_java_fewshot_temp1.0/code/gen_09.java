import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        Set<Integer> distinctSet = new HashSet<>();
        
        if (line != null) {
            String[] parts = line.split(",");
            for (String part : parts) {
                String trimmed = part.trim();
                if (!trimmed.isEmpty()) {
                    try {
                        int val = Integer.parseInt(trimmed);
                        distinctSet.add(val);
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視
                    }
                }
            }
        }
        
        long count = distinctSet.size();
        long sum = 0;
        for (int n : distinctSet) {
            sum += n;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
