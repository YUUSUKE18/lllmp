import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String countStr = br.readLine();
        int count = 0;
        int sum = 0;
        boolean first = true;
        if (countStr != null && !countStr.trim().isEmpty()) {
            count = Integer.parseInt(countStr.trim());
        }
        for (int i = 0; i < count; i++) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) continue;
            try {
                int num = Integer.parseInt(line.trim());
                sum += num;
                if (first || num > sum) { sum = num; first = false; }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
