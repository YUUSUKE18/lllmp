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
        int target = Integer.parseInt(line);
        int pairs = 0;
        int count = 0;
        String[] numbers = br.readLine().trim().split("\\s+");
        for (String num : numbers) {
            if (num.isEmpty()) continue;
            try {
                int n = Integer.parseInt(num);
                if (count >= 2) {
                    for (int i = 0; i < count; i++) {
                        if (n + numbers[i].trim().split("\\s+").indexOf(n) != -1) {
                            pairs++;
                            break;
                        }
                    }
                }
                count++;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
