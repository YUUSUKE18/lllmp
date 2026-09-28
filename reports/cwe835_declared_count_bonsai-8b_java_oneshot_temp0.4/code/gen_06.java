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
        int actualCount = 0;
        int lineNum = 0;
        while (true) {
            lineNum++;
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) continue;
            String[] parts = line.trim().split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                try {
                    long num = Long.parseLong(part);
                    sum += num;
                    actualCount++;
                } catch (NumberFormatException e) {
                }
            }
            if (lineNum > 2) break;
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
