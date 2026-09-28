import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        if (line != null) {
            String[] parts = line.split(":");
            for (int i = 0; i < parts.length; i++) {
                String value = parts[i].trim();
                if (value.isEmpty()) continue;
                String[] tokens = value.split(",");
                if (tokens.length < 2) continue;
                try {
                    int num = Integer.parseInt(tokens[0]);
                    int repeat = Integer.parseInt(tokens[1]);
                    if (num >= 0 && repeat >= 0) {
                        count += repeat;
                        sum += num * repeat;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
