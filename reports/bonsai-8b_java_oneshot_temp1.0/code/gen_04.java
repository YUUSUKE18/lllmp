import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        String[] parts = line.trim().split(",");
        int count = 0;
        long sum = 0;
        boolean seen = false;
        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;
            try {
                int num = Integer.parseInt(part);
                if (!seen && num != 0) {
                    seen = true;
                    count++;
                    sum += num;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
