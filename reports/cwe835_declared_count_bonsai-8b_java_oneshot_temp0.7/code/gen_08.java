import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String countStr = br.readLine();
        int count = 0;
        if (countStr != null) {
            try {
                count = Integer.parseInt(countStr);
            } catch (NumberFormatException e) {
            }
        }
        long sum = 0;
        int numRead = 0;
        while (br.readLine() != null) {
            String line = br.readLine().trim();
            if (line.isEmpty()) continue;
            String[] parts = line.split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                try {
                    long n = Long.parseLong(part);
                    sum += n;
                    numRead++;
                } catch (NumberFormatException e) {
                }
            }
            if (numRead > count) count = numRead;
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
