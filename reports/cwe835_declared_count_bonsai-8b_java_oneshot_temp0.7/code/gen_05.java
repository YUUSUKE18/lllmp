import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String countStr = br.readLine();
        int count = 0;
        boolean first = true;
        long sum = 0;
        String line;
        while ((line = br.readLine()) != null) {
            if (first && line.trim().isEmpty()) continue;
            if (!first && line.trim().isEmpty()) {
                first = true;
                continue;
            }
            String[] parts = line.trim().split("\\s+");
            if (parts.length == 0) continue;
            try {
                int n = Integer.parseInt(parts[0]);
                count = countStr.length() > 0 ? Integer.parseInt(countStr) : 0;
                if (n > count) count = n;
                sum += n;
                first = false;
            } catch (NumberFormatException e) {
                first = true;
                continue;
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
