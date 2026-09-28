import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        Set<Integer> distinctIntegers = new HashSet<>();
        
        if (line != null) {
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(part);
                    distinctIntegers.add(n);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        long count = 0;
        long sum = 0;
        
        if (!distinctIntegers.isEmpty()) {
            int[] values = new int[distinctIntegers.size()];
            int i = 0;
            for (int val : distinctIntegers) {
                values[i++] = val;
            }
            for (int val : values) {
                count++;
                sum += val;
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
