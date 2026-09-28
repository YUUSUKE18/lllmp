import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        int target = Integer.parseInt(line.trim());
        int count = 0;
        int sum = 0;
        boolean first = true;
        while ((line = br.readLine()) != null && !line.trim().isEmpty()) {
            if (first) {
                first = false;
                continue;
            }
            String[] parts = line.trim().split("\\s+");
            int num;
            for (String part : parts) {
                if (part.isEmpty()) continue;
                try {
                    num = Integer.parseInt(part);
                    if (sum + num == target) {
                        count++;
                        sum = 0;
                    } else if (sum + num > target) {
                        sum = 0;
                    } else {
                        sum += num;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
