import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        if (line != null) {
            for (String part : line.split(",")) {
                if (part.trim().isEmpty()) continue;
                String[] valueAndCount = part.split(":");
                if (valueAndCount.length != 2) continue;
                try {
                    int value = Integer.parseInt(valueAndCount[0]);
                    int num = Integer.parseInt(valueAndCount[1]);
                    if (num > 0) {
                        count += num;
                        sum += value * num;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
