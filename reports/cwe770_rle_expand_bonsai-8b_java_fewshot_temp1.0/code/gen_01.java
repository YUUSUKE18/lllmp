import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        String[] parts = line.split(",");
        for (String part : parts) {
            String value = part.split(":")[0].trim();
            String numStr = part.split(":")[1].trim();
            if (!value.isEmpty() && !numStr.isEmpty()) {
                try {
                    int n = Integer.parseInt(numStr);
                    count++;
                    sum += n;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
