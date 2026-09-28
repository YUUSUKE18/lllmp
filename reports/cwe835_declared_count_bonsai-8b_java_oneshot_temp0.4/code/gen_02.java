import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }
        int count = 0;
        long sum = 0;
        boolean first = true;
        for (String line2 : br.readLine()) {
            if (line2 == null || line2.trim().isEmpty()) continue;
            String[] parts = line2.trim().split("\\s+");
            if (parts.length == 0) continue;
            try {
                int num = Integer.parseInt(parts[0]);
                if (first || num > 0) {
                    sum += num;
                    count++;
                    first = false;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
