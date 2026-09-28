import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String countStr = br.readLine();
        long count = Long.parseLong(countStr);
        long sum = 0;
        int numRead = 0;
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            String[] parts = line.trim().split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                try {
                    long n = Long.parseLong(part);
                    if (numRead < count) {
                        sum += n;
                        numRead++;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + ", sum=" + sum);
    }
}
