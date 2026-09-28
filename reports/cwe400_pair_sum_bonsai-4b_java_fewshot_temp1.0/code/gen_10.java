import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int goal = 0;
        int pairs = 0;
        if (line != null) {
            try {
                goal = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                return;
            }
            String[] numbers = line.trim().split("\\s+");
            int count = 0;
            for (String num : numbers) {
                if (num.trim().isEmpty()) continue;
                try {
                    int value = Integer.parseInt(num.trim());
                    if (value == goal) {
                        pairs++;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
