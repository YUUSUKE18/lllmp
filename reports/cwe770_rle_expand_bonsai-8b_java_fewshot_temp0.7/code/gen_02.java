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
                int value;
                int num;
                try {
                    value = Integer.parseInt(part);
                    num = Integer.parseInt(part.substring(part.indexOf(":")+1));
                } catch (NumberFormatException e) {
                    continue;
                }
                if (num > 0) {
                    count += num;
                    sum += value * num;
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
