import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line);
        int pairs = 0;
        String[] numbers = line.trim().split("\\s+");
        for (String n : numbers) {
            if (n.trim().isEmpty()) continue;
            try {
                int val = Integer.parseInt(n.trim());
                if (val == target) pairs++;
                if (pairs >= 2) break;
            } catch (NumberFormatException e) {}
        }
        System.out.println("pairs=" + pairs);
    }
}
