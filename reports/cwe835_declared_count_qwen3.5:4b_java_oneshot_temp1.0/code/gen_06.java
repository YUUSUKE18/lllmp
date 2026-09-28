import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String nLine = br.readLine();
        if (nLine == null || nLine.trim().isEmpty()) return;
        
        int expectedCount;
        try {
            expectedCount = Integer.parseInt(nLine.trim());
        } catch (NumberFormatException e) {
            return;
        }
        
        long count = 0;
        long sum = 0;
        boolean foundFirst = false;

        while ((String line = br.readLine()) != null) {
            if (line.isEmpty()) continue;
            
            String[] tokens = line.trim().split("\\s+");
            for (String token : tokens) {
                if (token.isEmpty()) continue;
                
                long val;
                try {
                    val = Long.parseLong(token);
                } catch (NumberFormatException e) {
                    continue;
                }
                
                count++;
                sum += val;
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
