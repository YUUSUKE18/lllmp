import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null || line1.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        int count = 0;
        long sum = 0;

        String[] parts = line1.trim().split("\\s+");
        int n;
        try {
            n = Integer.parseInt(parts[0]);
        } catch (NumberFormatException e) {
            System.out.println("count=0 sum=0");
            return;
        }

        long val;
        for (int i = 1; ; i++) {
            String line = br.readLine();
            if (line == null || line.isEmpty()) break;
            
            try {
                val = Long.parseLong(line.trim());
                count++;
                sum += val;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
