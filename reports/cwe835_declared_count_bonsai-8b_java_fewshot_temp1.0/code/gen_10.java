import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        int count = Integer.parseInt(line);
        long sum = 0;
        int i = 0;
        while (i < count && line != null) {
            line = br.readLine();
            if (line == null) break;
            String[] parts = line.trim().split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                try {
                    long num = Long.parseLong(part);
                    sum += num;
                } catch (NumberFormatException e) {
                }
            }
            i++;
        }
        System.out.println("count=" + i + " sum=" + sum);
    }
}
