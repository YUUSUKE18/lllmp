import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String firstLine = br.readLine();
        if (firstLine == null || firstLine.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int countInput = 0;
        try {
            countInput = Integer.parseInt(firstLine.trim());
        } catch (NumberFormatException e) {
            System.out.println("count=0 sum=0");
            return;
        }

        long sum = 0;
        int actualCount = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            
            try {
                long n = Long.parseLong(line.trim());
                sum += n;
                actualCount++;
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
