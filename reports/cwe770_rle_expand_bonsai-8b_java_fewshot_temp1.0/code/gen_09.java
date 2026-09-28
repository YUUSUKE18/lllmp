import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        if (line != null) {
            String[] parts = line.trim().split(",");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                int value = 0, num = 0;
                int colonPos = -1;
                for (int i = 0; i < part.length(); i++) {
                    if (part.charAt(i) == ':') {
                        colonPos = i;
                    } else if (colonPos != -1) {
                        num = Integer.parseInt(part.substring(colonPos + 1).trim());
                        count++;
                        sum += num;
                    }
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
