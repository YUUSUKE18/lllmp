import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int pairs = 0;
        int goal = 0;
        if (line != null) {
            goal = Integer.parseInt(line.trim());
            String[] tokens = line.trim().split("\\s+");
            for (String token : tokens) {
                if (token.trim().isEmpty()) continue;
                try {
                    int n = Integer.parseInt(token.trim());
                    if (n > goal) pairs++;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
