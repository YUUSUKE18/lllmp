import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = 0;
        long count = 0;
        boolean first = true;
        if (line != null) {
            try {
                target = Long.parseLong(line);
            } catch (NumberFormatException e) {
            }
        }
        while ((line = br.readLine()) != null) {
            if (first) {
                first = false;
                continue;
            }
            String[] parts = line.trim().split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                try {
                    long num = Long.parseLong(part);
                    if (num == 0) continue;
                    if (target == 0) {
                        count = 0;
                        continue;
                    }
                    if (num > target) {
                        count = 0;
                        continue;
                    }
                    if (count < 2) {
                        if (target - num > 0) {
                            count += 1;
                        }
                    } else {
                        if (target - num > 0) {
                            count += 1;
                        }
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
