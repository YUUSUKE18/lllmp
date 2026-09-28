import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) return;
        int target = Integer.parseInt(line);
        int count = 0;
        int first = true;
        while ((line = br.readLine()) != null && !line.trim().isEmpty()) {
            for (String num : line.split("\\s+")) {
                if (!num.isEmpty() && Integer.parseInt(num) != 0) {
                    if (!first) {
                        int n = Integer.parseInt(num);
                        if (n + target > 0 && count < 2) {
                            count++;
                        }
                    } else {
                        first = false;
                    }
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
